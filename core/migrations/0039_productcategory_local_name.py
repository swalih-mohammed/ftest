# Generated by Django 2.2.4 on 2020-10-06 08:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0038_auto_20201006_1405'),
    ]

    operations = [
        migrations.AddField(
            model_name='productcategory',
            name='local_name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]