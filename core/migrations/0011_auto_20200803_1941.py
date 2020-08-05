# Generated by Django 2.2.4 on 2020-08-03 19:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_auto_20200803_1404'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appinfo',
            name='coverPhoto2',
            field=models.ImageField(blank=True, null=True, upload_to='app_info'),
        ),
        migrations.AlterField(
            model_name='item',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='product'),
        ),
        migrations.AlterField(
            model_name='item',
            name='image_1',
            field=models.ImageField(blank=True, null=True, upload_to='product'),
        ),
        migrations.AlterField(
            model_name='item',
            name='image_2',
            field=models.ImageField(blank=True, null=True, upload_to='product'),
        ),
        migrations.AlterField(
            model_name='place',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='place'),
        ),
        migrations.AlterField(
            model_name='productcategory',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='product-category'),
        ),
        migrations.AlterField(
            model_name='shop',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='shop'),
        ),
        migrations.AlterField(
            model_name='shop',
            name='image_1',
            field=models.ImageField(blank=True, null=True, upload_to='shop'),
        ),
        migrations.AlterField(
            model_name='shopcategory',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='shop-category'),
        ),
    ]