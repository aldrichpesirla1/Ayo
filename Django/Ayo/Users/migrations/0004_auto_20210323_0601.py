# Generated by Django 3.1.3 on 2021-03-23 06:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0003_auto_20210321_0221'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.CharField(max_length=15, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='contact_number',
            field=models.CharField(max_length=15),
        ),
    ]
