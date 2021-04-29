from login_register.models import *
import pandas as pd
from datetime import date
from django.contrib.auth.models import User

'''
----------------------------
FOR DATATABLE FUNCTIONS:
----------------------------
to generate datatable for both datatable views and view order
datatable = datatable_farmer(<farmer id>) or datatable_customer(<customer id>)
to generate datatable dictionary for dashboard datatables
datatable_dictionary = display_farmer_table(datatable) or display_customer_table(datatable)
to generate datatable for all order pairs or all orders
datatable = datatable_orders() or datatable_order_pairs()
ADMIN RELATED
to generate datatable dictionary for admin datatables
datatable_dictionary = display_all_orders(datatable) or display_all_order_pairs(datatable)
to generate datatable dictionary for all users
display_all_users()
-------------------------------
ALGORITHM FUNCTION (NOT FINAL)
-------------------------------
to generate a list of top 10 (or sa pilay maabot) recommendations
matching_algorithm(<farmer land_area>)
----------------------------
ACCOUNT CHANGE FUNCTIONS
----------------------------
TO COLLECTIVELY CHANGE FARMER DETAILS CALL
change_farmer_details(<farmer id>, <details>*)
TO COLLECTIVELY CHANGE CUSTOMER DETAILS CALL
change_customer_details(<customer id>, <details>*)
*details must be a 2D list whose list components follow the format
['name of the attribute', 'value']
e.g.
details = [['is_cancelled',True]['message','Overdue order']]
--------------------------
DATABASE ADDING FUNCTIONS
--------------------------
TO RESERVE ORDER
reserve_order(<order id>, <farmer id>)
(make sure that order_id is UUID, you can use Order['order_id'])
TO CHECK IF LOCATION EXISTS GIVEN A LOCATION AND RETURN THE APPROPRIATE LOCATION ID
USED TO GET LOCATION ID FOR CREATE ORDER
get_order_location(<customer id>,<candidate location dictionary>)
*note:  candidate location must be of the form {'street': , 'brgy', 'city', 'provice'}
---------------------------------------------------------
STARTUP FUNCTIONS / RUN EVERYTIME SOMETHING GETS UPDATED
---------------------------------------------------------
TO COLLECTIVELY CALCULATE LAND AREA
calculate_land_area()
RELATED TO RESERVE_ORDER, UPDATES TIME ESTIMATE DURING RESERVATION
update_time_single(<order pair>)
*note: function is included in reserve_order, so no need to call for upcoming order_pairing
----------------------------
CUSTOMER RELATED FUNCTIONS
----------------------------
TO GET ALL OF CUSTOMER'S LOCATIONS
get_customer_location(<customer id>)
-----------------
GETTER FUNCTIONS
-----------------
TO GET A DICTIONARY LIST OF ALL CROPS
get_crop_list()
--------------------------------------------------
SCHEDULED FUNCTIONS (SEE login_register/scheduler)
--------------------------------------------------
TO COLLECTIVELY CHECK OBSOLETE (1-Month Old) ORDERS
check_obsolete_orders()
*note: Automatically adds an "Overdue" message
---------------
EXTRA FUNCTIONS
---------------
get_name(name_id)
TO GET STATUS COUNTS
count_status(< farmer/customer  datatable>)
'''

def convert(time):
    try:
        if time == "N/A":
            return "N/A"
        return dt(time.year,time.month,time.day)
    except:
        return None

def printable_convert(time):
    try:
        return convert(time).strftime('%B %d, %Y')
    except:
        return "N/A"

def printable_month(time):
    try:
        return convert(time).strftime('%B %Y')
    except:
        return "N/A"
# get farmer's accepted orders
def get_order_pairing_farmer(id):
    df = pd.DataFrame(Order_Pairing.objects.filter(farmer_id=id).values())
    if len(df) != 0:
        df['accepted_date'] = df['accepted_date'].apply(printable_convert)
        df['expected_time'] = df['expected_time'].apply(printable_month)
        df['harvested_date'] = df['harvested_date'].apply(printable_convert)
        df['delivered_date'] = df['delivered_date'].apply(printable_convert)
        df['collected_date'] = df['collected_date'].apply(printable_convert)
        return df.rename(columns={"id":"order_pair_id"})
    return df

# generates datatable for farmer dashboard
def datatable_farmer(id):
    df = get_order_pairing_farmer(id)
    if len(df) == 0:
        return df
    else:
        order_ids = [item[1] for item in df.values]
        orders = pd.DataFrame(Order.objects.filter(order_id__in=order_ids).values()).drop(columns=["status"])
        crops = pd.DataFrame(Crop.objects.filter(id__in=[item[2] for item in orders.values]).values('id','name'))
        final_order = orders.merge(crops, left_on="crop_id",right_on="id").drop(columns=["crop_id","id"])
        final_order['order_date'] = final_order['order_date'].apply(printable_convert)

        return df.merge(final_order, left_on="order_id_id", right_on="order_id").drop(columns=["order_id_id","order_id"])

# to be called after datatable_farmer to generate datatable dictionary
# if no order_pairs exist, returns None
def display_farmer_table(df):
    print(df.columns)
    if len(df) == 0:
        return df
    else:
        df = df.sort_values('accepted_date',ascending=False).reset_index(drop=True).rename(columns={'status_y':'status'})
        return df[['order_pair_id','accepted_date','order_date','approved_date','name','weight','land_area_needed','location_id','harvested_date','status','expected_time']].to_dict('records')

# get customer's orders
def get_order_customer(id):
    df = pd.DataFrame(Order.objects.filter(customer=id).values())
    if len(df) != 0:
        df['order_date'] = df['order_date'].apply(convert)
        return df
    else:
        return df

# get crop details of customer's orders
def get_complete_order_customer(id):
    df = get_order_customer(id)
    if len(df) != 0:
        crops = pd.DataFrame(Crop.objects.filter(id__in=[item[2] for item in df.values]).values('id','name'))
        return df.merge(crops, left_on="crop_id", right_on="id").drop(columns=["crop_id","id"])
    else:
        return df

# generates datatable for customer dashboard
def datatable_customer(id):
    order= get_complete_order_customer(id)
    if len(order) !=0:
        #df = pd.DataFrame(Order_Pairing.objects.filter(order_id_id__in=[val[0] for val in order.values]).values()).drop(columns=["status"])
        df = pd.DataFrame(Order_Pairing.objects.filter(order_id_id__in=[val for val in order['order_id'].to_list()]).values())
        if len(df) == 0:
            order['order_date'] = order['order_date'].apply(printable_convert)
            order[['order_pair_id', 'farmer_id', 'expected_time', 'accepted_date', 'harvested_date', 'collected_date', 'delivered_date']] = "N/A"
            return order
        else:
            df.drop(columns="status",inplace=True)
            df = order.merge(df, how="left", left_on="order_id", right_on="order_id_id").fillna("N/A").drop(columns=["order_id_id"])
            if len(df) != 0:
                df['order_date'] = df['order_date'].apply(printable_convert)
                df['accepted_date'] = df['accepted_date'].apply(printable_convert)
                df['harvested_date'] = df['harvested_date'].apply(printable_convert)
                df['collected_date'] = df['collected_date'].apply(printable_convert)
                df['delivered_date'] = df['delivered_date'].apply(printable_convert)
                df['approved_date'] = df['approved_date'].apply(printable_convert)
                return df.rename(columns={'id':'order_pair_id'})
    return order

# to be called after datatable_customer to generate datatable dictionary
# if no orders, returns None
def display_customer_table(df):
    if len(df) == 0:
        return None
    else:
        df = df.sort_values('order_date',ascending=False).reset_index(drop=True).rename(columns={'status_y':'status'})
        df.rename(columns={'accepted_date':'reserved_date'},inplace=True)
        return df[['order_id','order_pair_id','order_date','approved_date','reserved_date','harvested_date','collected_date','delivered_date','location_id','name','weight','status']].to_dict('records')

# BACKEND FUNCTIONS

def change_farmer_details(id,details):
    Farmer.objects.get(id=id).set_value(details)

def change_customer_details(id,details):
    Customer.objects.get(id=id).set_value(details)

def reserve_order(order_id,farmer_id):
    d = Order_Pairing(order_id_id=order_id,farmer_id=farmer_id)
    d.save()
# order related functions

def update_time_single(order_pair):
    order = Order.objects.all().filter(order_id=order_pair.order_id_id).values('crop_id')[0]
    crop_time = Crop.objects.all().filter(id=order['crop_id']).values('harvest_time')[0]['harvest_time']
    order_pair.expected_time = convert(order_pair.accepted_date) + timedelta(days=crop_time)
    order_pair.save()

def add_order(customer_id, crop_id, demand, location_id):
    new_order = Order(customer_id=customer_id, crop_id=crop_id, weight=demand, location_id=location_id)
    new_order.save()
    return new_order

# algorithm, to be launched as part of the
def matching_algorithm(farmer):
    # based on province

    available_order = pd.DataFrame(Order.objects.filter(Q(status="Posted") & Q(location__province=farmer.location.province)).values())
    if len(available_order) != 0:
        loc_list = available_order['location_id'].unique()
        available_order = available_order.merge(pd.DataFrame(Location.objects.filter(id__in=loc_list).values('id','name')),  left_on="location_id", right_on="id").drop(columns=["id"]).rename(columns={'name':'location'})
        # based on available_land_area
        available_order = available_order[available_order['land_area_needed'] <= farmer.available_land_area].sort_values('land_area_needed',ascending=False)
        # based on suitability (refer to Location_Crop)
        suitable_crops = Location_Crop.objects.get(location__province=farmer.location.province).name.values_list("id",flat=True)
        available_order['is_suitable'] = available_order['crop_id'].apply(lambda crop: crop in suitable_crops)
        available_order.sort_values(["is_suitable",'weight'], ascending=False)
        available_order['index'] = [i for i in range(1,len(available_order)+1)]
        available_order['order_date'] = available_order['order_date'].apply(printable_convert)
        available_order['approved_date'] = available_order['approved_date'].apply(printable_convert)
        return available_order[:10].to_dict('records')
    else:
        return []

# not really effective without the SMS
def matching_algorithm_all():
    pass

# CHECK IF IT ALSO WORKS FOR NON ONGOING FUNCTIONS
def check_obsolete_orders():
    order = pd.DataFrame(Order.objects.all().filter(message__isnull=True).values())
    pairs = pd.DataFrame(Order_Pairing.objects.all().values())
    if len(pairs) > 0 and len(order) > 0:
        merged_df = order.merge(pairs, how="left",left_on="order_id", right_on="order_id_id").drop(columns='order_id_id')
        merged_df['order_date'] = merged_df['order_date'].apply(convert)
        merged_df = merged_df.loc[merged_df['farmer_id'].isnull()]
        now = dt.now()
        date_now = dt(now.year, now.month, now.day)

        for i in range(len(merged_df)):
            val = merged_df.iloc[i]
            #if a month has passed and order is not cancelled
            if (date_now - val['order_date']).days > 29 and not val['is_cancelled']:
                print(val)
                Order.objects.get(order_id = merged_df.iloc[i]['order_id']).set_value([["is_cancelled",True],["message","1 month overdue"]])
        delete_obsolete_orders()

def delete_obsolete_orders():
    overdue_df = pd.DataFrame(Order.objects.filter(status="Cancelled").values())
    if len(overdue_df) > 0:
        overdue_df.dropna(subset=['cancelled_date'],inplace=True)
        overdue_df['cancelled_date'] = overdue_df['cancelled_date'].apply(convert)
        overdue_df['diff'] = overdue_df['cancelled_date'].apply(lambda w: (dt.now()-w).days)
        for i in overdue_df.loc[overdue_df['diff'] > 14]['order_id']: Order.objects.get(order_id=i).delete()

def get_crop_list():
    return Crop.objects.all().values('id','name')

# used for adding order
def get_order_location(id,loc):
    # checks for loc similar toexisting addresses in customer
    for location_record in Customer.objects.get(id=id).location.all():
        if loc['street'] == location_record.street and loc['brgy'] == location_record.brgy and loc['city'] == location_record.city and loc['province'] == location_record.province:
            return customer_location
    # no match, create new location
    newloc = Location(street=loc['street'], brgy = loc['brgy'], city = loc['city'], province = loc['province'] )
    newloc.save()
    return Location.objects.latest('id').id

def get_customer_location(id):
    return Customer.objects.get(id=id).get_locations()

def get_name(name_id):
    user = User.objects.get(id=name_id)
    return user.first_name,user.last_name

def all_orders_datatable():
    return datatable_orders(pd.DataFrame(Order.objects.all().values()))

def datatable_orders(orders=None):
    if orders is None:
        orders = pd.DataFrame(Order.objects.all().values())
    orders = orders.merge(pd.DataFrame(Crop.objects.filter(id__in=orders['crop_id'].unique()).values('name','id')), left_on="crop_id", right_on="id").drop(columns="id").rename(columns={'name':'crop_name'})
    orders = orders.merge(pd.DataFrame(Location.objects.filter(id__in=orders['location_id'].unique()).values('name','id')), left_on="location_id", right_on="id").drop(columns=["location_id","id"]).rename(columns={'name':'location'})

    customers = pd.DataFrame(Customer.objects.all().values())
    customers['customer_names'] = customers['name_id'].apply(get_name)
    customers = customers[['id','customer_names']]

    return orders.merge(customers, left_on="customer_id",right_on="id").drop(columns='id')

def display_all_orders(df):
    if len(df) == 0:
        return None
    else:
        df = df.sort_values('order_date',ascending=False).reset_index(drop=True)
        df['order_date'] = df['order_date'].apply(printable_convert)
        return df[['customer_id','customer_names','order_id','order_date','location','crop_name','weight','status']].to_dict('records')

def datatable_order_pairs():
    try:
        pairs = pd.DataFrame(Order_Pairing.objects.all().values())
        orders = datatable_orders(pd.DataFrame(Order.objects.filter(order_id__in=pairs['order_id_id']).values())).drop(columns="status")
        farmers = pd.DataFrame(Farmer.objects.all().values()).rename(columns={'id':'farm_id'})
        farmers['farmer_names'] = farmers['name_id'].apply(get_name)
        farmers = farmers[['farm_id','farmer_names']]
        return pairs.merge(orders, left_on="order_id_id", right_on="order_id").drop(columns="order_id_id").merge(farmers, left_on="farmer_id", right_on="farm_id").drop(columns="farm_id")
    except Exception as e:
        print('--------------exception:\n',e)
        return []

def display_all_order_pairs(df):
    if len(df) == 0:
        return None
    else:
        df = df.sort_values('order_date',ascending=False).reset_index(drop=True)
        df['order_date'] = df['order_date'].apply(printable_convert)
        return df[['customer_id','customer_names','farmer_id','farmer_names','order_id','order_date','location','crop_name','weight','status']].to_dict('records')

def display_all_users():
    try:
        users = pd.DataFrame(User.objects.all().values("id","username","email","first_name","last_name")).rename(columns={'id':'user_id'})
        customers = Customer.objects.all()
        final_dic = {}
        if len(customers) > 0:
            customers_df = pd.DataFrame(customers.values('contact_number','name','is_approved')).rename(columns={'name':'customer_name'})
            customers_df['location'] = [cust.get_locations() for cust in customers]
            customers_df['location'] = [[w[0] for w in x] for x in customers_df['location']]
            customers_df = customers_df.merge(users, left_on="customer_name", right_on="user_id").drop(columns=["customer_name"])
            final_dic.update({'customer':customers_df.to_dict('records')})

        farmers = pd.DataFrame(Farmer.objects.all().values('contact_number','location','name','is_approved','land_area')).rename(columns={'name':'farmer_name'})
        if len(farmers) > 0:
            f_unique_locs = farmers['location'].unique()
            farmers = farmers.merge(pd.DataFrame(Location.objects.filter(id__in=f_unique_locs).values('name','id')), left_on="location", right_on="id").drop(columns=["location","id"]).rename(columns={'name':'location'})
            farmers = farmers.merge(users, left_on="farmer_name", right_on="user_id").drop(columns="farmer_name")
            final_dic.update({'farmer':farmers.to_dict('records')})

        return final_dic
    except:
        return []