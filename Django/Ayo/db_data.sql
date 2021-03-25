DROP TABLE IF EXISTS auth_group;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
DROP TABLE IF EXISTS auth_group_permissions;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`, `permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
DROP TABLE IF EXISTS auth_permission;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`, `codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 45 DEFAULT CHARSET = latin1;
DROP TABLE IF EXISTS auth_user;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = latin1;
DROP TABLE IF EXISTS auth_user_groups;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR (30) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`, `group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
DROP TABLE IF EXISTS auth_user_user_permissions;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`, `permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
DROP TABLE IF EXISTS django_admin_log;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = latin1;
DROP TABLE IF EXISTS django_content_type;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`, `model`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = latin1;
DROP TABLE IF EXISTS django_migrations;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 21 DEFAULT CHARSET = latin1;
DROP TABLE IF EXISTS django_session;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
DROP TABLE IF EXISTS Users_customer;
CREATE TABLE `Users_customer` (
  `user_ptr_id` char(32) NOT NULL,
  `medical_record` longtext,
  `is_verified` tinyint(1) NOT NULL,
  PRIMARY KEY (`user_ptr_id`),
  CONSTRAINT `Users_customer_user_ptr_id_f4ff1683_fk_Users_user_id` FOREIGN KEY (`user_ptr_id`) REFERENCES `Users_user` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
DROP TABLE IF EXISTS Users_owner;
CREATE TABLE `Users_owner` (
  `user_ptr_id` char(32) NOT NULL,
  PRIMARY KEY (`user_ptr_id`),
  CONSTRAINT `Users_owner_user_ptr_id_f51165e0_fk_Users_user_id` FOREIGN KEY (`user_ptr_id`) REFERENCES `Users_user` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
DROP TABLE IF EXISTS Users_pharmacyworker;
CREATE TABLE `Users_pharmacyworker` (
  `user_ptr_id` char(32) NOT NULL,
  `is_available` tinyint(1) NOT NULL,
  PRIMARY KEY (`user_ptr_id`),
  CONSTRAINT `Users_pharmacyworker_user_ptr_id_b67b4646_fk_Users_user_id` FOREIGN KEY (`user_ptr_id`) REFERENCES `Users_user` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
DROP TABLE IF EXISTS Users_user;
CREATE TABLE `Users_user` (
  `id` char(32) NOT NULL,
  `name` varchar(200) NOT NULL,
  `contact_number` varchar(15) NOT NULL,
  `address` varchar(200) NOT NULL,
  `registration` datetime(6) NOT NULL,
  `role` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
INSERT INTO
  auth_permission(id, name, content_type_id, codename)
VALUES(1, 'Can add log entry', 1, 'add_logentry'),(2, 'Can change log entry', 1, 'change_logentry'),(3, 'Can delete log entry', 1, 'delete_logentry'),(4, 'Can view log entry', 1, 'view_logentry'),(5, 'Can add permission', 2, 'add_permission'),(6, 'Can change permission', 2, 'change_permission'),(7, 'Can delete permission', 2, 'delete_permission'),(8, 'Can view permission', 2, 'view_permission'),(9, 'Can add group', 3, 'add_group'),(10, 'Can change group', 3, 'change_group'),(11, 'Can delete group', 3, 'delete_group'),(12, 'Can view group', 3, 'view_group'),(13, 'Can add user', 4, 'add_user'),(14, 'Can change user', 4, 'change_user'),(15, 'Can delete user', 4, 'delete_user'),(16, 'Can view user', 4, 'view_user'),(17, 'Can add content type', 5, 'add_contenttype'),(
    18,
    'Can change content type',
    5,
    'change_contenttype'
  ),(
    19,
    'Can delete content type',
    5,
    'delete_contenttype'
  ),(20, 'Can view content type', 5, 'view_contenttype'),(21, 'Can add session', 6, 'add_session'),(22, 'Can change session', 6, 'change_session'),(23, 'Can delete session', 6, 'delete_session'),(24, 'Can view session', 6, 'view_session'),(25, 'Can add user', 7, 'add_user'),(26, 'Can change user', 7, 'change_user'),(27, 'Can delete user', 7, 'delete_user'),(28, 'Can view user', 7, 'view_user'),(
    29,
    'Can add pharmacy worker',
    8,
    'add_pharmacyworker'
  ),(
    30,
    'Can change pharmacy worker',
    8,
    'change_pharmacyworker'
  ),(
    31,
    'Can delete pharmacy worker',
    8,
    'delete_pharmacyworker'
  ),(
    32,
    'Can view pharmacy worker',
    8,
    'view_pharmacyworker'
  ),(33, 'Can add owner', 9, 'add_owner'),(34, 'Can change owner', 9, 'change_owner'),(35, 'Can delete owner', 9, 'delete_owner'),(36, 'Can view owner', 9, 'view_owner'),(37, 'Can add customer', 10, 'add_customer'),(38, 'Can change customer', 10, 'change_customer'),(39, 'Can delete customer', 10, 'delete_customer'),(40, 'Can view customer', 10, 'view_customer'),(
    41,
    'Can add purchase request',
    11,
    'add_purchaserequest'
  ),(
    42,
    'Can change purchase request',
    11,
    'change_purchaserequest'
  ),(
    43,
    'Can delete purchase request',
    11,
    'delete_purchaserequest'
  ),(
    44,
    'Can view purchase request',
    11,
    'view_purchaserequest'
  );
INSERT INTO
  auth_user(
    id,
    password,
    last_login,
    is_superuser,
    username,
    first_name,
    last_name,
    email,
    is_staff,
    is_active,
    date_joined
  )
VALUES(
    1,
    'pbkdf2_sha256$216000$4OXT8I2OODlf$A/8ufmK1zf1AeN8f/fqgWLWUhUgooB+dfouCDKBCxG0=',
    '2021-03-18 05:09:45.088493',
    1,
    'ayo',
    '',
    '',
    '',
    1,
    1,
    '2021-03-18 05:03:05.852461'
  );
INSERT INTO
  django_admin_log(
    id,
    action_time,
    object_id,
    object_repr,
    action_flag,
    change_message,
    content_type_id,
    user_id
  )
VALUES(
    1,
    '2021-03-18 05:11:32.829763',
    X '62666438636230632d373432652d346462612d393765312d396563383532613762663163',
    'Owner object (bfd8cb0c-742e-4dba-97e1-9ec852a7bf1c)',
    1,
    X '5b7b226164646564223a207b7d7d5d',
    9,
    1
  ),(
    2,
    '2021-03-18 05:11:44.710449',
    X '62666438636230632d373432652d346462612d393765312d396563383532613762663163',
    'Owner object (bfd8cb0c-742e-4dba-97e1-9ec852a7bf1c)',
    3,
    X '',
    9,
    1
  ),(
    3,
    '2021-03-18 05:14:40.233646',
    X '39616635353231652d386366392d346130622d613033342d333439613535323139626235',
    'Owner object (9af5521e-8cf9-4a0b-a034-349a55219bb5)',
    1,
    X '5b7b226164646564223a207b7d7d5d',
    9,
    1
  );
INSERT INTO
  django_content_type(id, app_label, model)
VALUES(1, 'admin', 'logentry'),(3, 'auth', 'group'),(2, 'auth', 'permission'),(4, 'auth', 'user'),(5, 'contenttypes', 'contenttype'),(11, 'PurchaseRequests', 'purchaserequest'),(6, 'sessions', 'session'),(10, 'Users', 'customer'),(9, 'Users', 'owner'),(8, 'Users', 'pharmacyworker'),(7, 'Users', 'user');
INSERT INTO
  django_migrations(id, app, name, applied)
VALUES(
    1,
    'contenttypes',
    '0001_initial',
    '2021-03-18 01:18:55.980847'
  ),(
    2,
    'auth',
    '0001_initial',
    '2021-03-18 01:18:58.355012'
  ),(
    3,
    'admin',
    '0001_initial',
    '2021-03-18 01:19:06.331976'
  ),(
    4,
    'admin',
    '0002_logentry_remove_auto_add',
    '2021-03-18 01:19:08.437060'
  ),(
    5,
    'admin',
    '0003_logentry_add_action_flag_choices',
    '2021-03-18 01:19:08.481804'
  ),(
    6,
    'contenttypes',
    '0002_remove_content_type_name',
    '2021-03-18 01:19:09.895359'
  ),(
    7,
    'auth',
    '0002_alter_permission_name_max_length',
    '2021-03-18 01:19:10.043083'
  ),(
    8,
    'auth',
    '0003_alter_user_email_max_length',
    '2021-03-18 01:19:10.199684'
  ),(
    9,
    'auth',
    '0004_alter_user_username_opts',
    '2021-03-18 01:19:10.273927'
  ),(
    10,
    'auth',
    '0005_alter_user_last_login_null',
    '2021-03-18 01:19:11.057216'
  ),(
    11,
    'auth',
    '0006_require_contenttypes_0002',
    '2021-03-18 01:19:11.103475'
  ),(
    12,
    'auth',
    '0007_alter_validators_add_error_messages',
    '2021-03-18 01:19:11.159982'
  ),(
    13,
    'auth',
    '0008_alter_user_username_max_length',
    '2021-03-18 01:19:11.519244'
  ),(
    14,
    'auth',
    '0009_alter_user_last_name_max_length',
    '2021-03-18 01:19:11.687277'
  ),(
    15,
    'auth',
    '0010_alter_group_name_max_length',
    '2021-03-18 01:19:12.219974'
  ),(
    16,
    'auth',
    '0011_update_proxy_permissions',
    '2021-03-18 01:19:12.274944'
  ),(
    17,
    'auth',
    '0012_alter_user_first_name_max_length',
    '2021-03-18 01:19:12.434512'
  ),(
    18,
    'sessions',
    '0001_initial',
    '2021-03-18 01:19:12.807043'
  ),(
    19,
    'Users',
    '0001_initial',
    '2021-03-18 05:03:59.208506'
  ),(
    20,
    'PurchaseRequests',
    '0001_initial',
    '2021-03-18 05:43:11.412284'
  );
INSERT INTO
  django_session(session_key, session_data, expire_date)
VALUES(
    'ab3ox0z8evhtn64vu2s9to45ry27t5ss',
    X '2e654a78566a45454f7769415152655f433268426f67614575335873474d737777556a56745574715638653761704176645f76666566366d453231725431737153526c5a6e5a645870643874496a7a4c74674f383433575a4e38375175593961376f675f613948586d38727763377439427856615f745745662d7746795a306a49436759523432337351596f4a67354d42694d4554754d34456a4c613336446d5432457a524d63524f76545f67475466613a316c4d6b756e3a7a7a434c6f4c58384138413939674d6e323268396b4e7a70457233314353567342366778754859412d4830',
    '2021-04-01 05:09:45.179670'
  );
INSERT INTO
  Users_owner(user_ptr_id)
VALUES('9af5521e8cf94a0ba034349a55219bb5');
INSERT INTO
  Users_user(id, name, contact_number, address, registration, role)
VALUES(
    '9af5521e8cf94a0ba034349a55219bb5',
    'Juan Dela Cruz',
    '09331234431',
    'Kabangkalan',
    '2021-03-18 05:14:40.230277',
    'Owner'
  );