# Generated by Django 2.2.9 on 2020-03-03 01:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedbacks', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback',
            name='sender',
            field=models.CharField(max_length=120, null=True),
        ),
    ]
