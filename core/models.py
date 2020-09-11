from django.db.models.signals import post_save
from django.conf import settings
from django.db import models
from django.db.models import Sum
from django.shortcuts import reverse
from django_countries.fields import CountryField



class AppInfo(models.Model):
    coverPhoto1 = models.ImageField(upload_to='app_info',blank=True, null=True)
    coverPhoto2 = models.ImageField(upload_to='app_info',blank=True, null=True)
    shippingMessage  = models.TextField(max_length=250, blank=True, null=True)
    offerMessage  = models.TextField(max_length=250, blank=True, null=True)
    maintanance = models.BooleanField(default=False)
    phone1 = models.CharField(max_length=11, blank=True, null=True)
    phone2 = models.CharField(max_length=11, blank=True, null=True)

class Area(models.Model):
    name = models.CharField(max_length=100)
    place = models.ForeignKey('Place', blank=True, null=True, related_name = 'place', max_length=100, on_delete=models.CASCADE)
    is_shipping = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Place(models.Model):
    name = models.CharField(max_length=100)
    # areas = models.ManyToManyField('Area', related_name = 'areas', blank=True, null=True)
    village = models.ForeignKey('Village', related_name = 'village', blank=True, null=True,max_length=100, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='place', default='/place/default_place.jpg',blank=True, null=True)
    is_shipping = models.BooleanField(default=False)
    shipping_message = models.TextField(max_length=200, blank=True, null=True)
    offer_message = models.TextField(max_length=200, blank=True, null=True)
    exicutive_phone_number = models.CharField(max_length=12 ,blank=True, null=True)
    create_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return self.name


class Village(models.Model):
    name = models.CharField(max_length=100)
    cluster = models.ForeignKey('Cluster', related_name = 'cluster', blank=True, null=True, max_length=100, on_delete=models.CASCADE)
    # district = models.ForeignKey('District', related_name = 'district', blank=True, null=True,  max_length=100, on_delete=models.CASCADE)
    villageDistrict = models.ForeignKey('District', related_name = 'villageDistrict', blank=True, null=True,  max_length=100, on_delete=models.CASCADE)
    # places = models.ManyToManyField(Place)
    is_shipping = models.BooleanField(default=False)
    shipping_message = models.TextField(blank=True, null=True)
    create_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return self.name

class Cluster(models.Model):
    name = models.CharField(max_length=100)
    district = models.ForeignKey('District', related_name = 'district', blank=True, null=True,  max_length=100, on_delete=models.CASCADE)
    # villages = models.ManyToManyField('Village')
    is_shipping = models.BooleanField(default=False)
    create_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return self.name

class District(models.Model):
    name = models.CharField(max_length=100)
    state = models.ForeignKey('State', related_name = 'state', max_length=100, blank= True, null=True, on_delete=models.CASCADE)
    # clusters = models.ManyToManyField('Cluster')
    is_shipping = models.BooleanField(default=False)
    create_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return self.name

class State(models.Model):
    name = models.CharField(max_length=100)
    # districts = models.ManyToManyField('District')
    is_shipping = models.BooleanField(default=False)
    create_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return self.name

class ProductCategory(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='product-category',blank=True, null=True)
    create_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    def __str__(self):
        return self.name

class ShopCategory(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='shop-category',blank=True, null=True)
    create_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    def __str__(self):
        return self.name

class ModeOfPayment(models.Model):
    name = models.CharField(max_length=100)
    # shop = models.ForeignKey(Shop, blank=True, null=True, on_delete=models.CASCADE)
    def __str__(self):
        return self.name

class Shop(models.Model):

    name = models.CharField(max_length=100, blank=True, null=True)
    owner_name = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.CharField(max_length=100, blank=True, null=True)

    place = models.ForeignKey(Place, blank=True, null=True,
                              on_delete=models.CASCADE)
    village = models.ForeignKey(Village, blank=True, null=True,
                              on_delete=models.CASCADE)
    cluster = models.ForeignKey(Cluster,blank=True, null=True,
                              on_delete=models.CASCADE)
    district = models.ForeignKey(District,blank=True, null=True,
                              on_delete=models.CASCADE)
    state = models.ForeignKey(State, blank=True, null=True,
                              on_delete=models.CASCADE)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE, blank=True, null=True)
    full_address = models.TextField(blank=True, null=True)
    shopCategory = models.ForeignKey(ShopCategory,null=True, blank=True, on_delete=models.DO_NOTHING )
    slug = models.SlugField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='shop', default='/shop/default_shop.jpg',blank=True, null=True)
    image_1 = models.ImageField(upload_to='shop', default='/shop/default_shop.jpg',blank=True, null=True)
    shipping_message = models.TextField(blank=True, null=True)
    offer_message = models.TextField(blank=True, null=True)
    is_accepting_orders = models.BooleanField(default=False)
    product_categories = models.ManyToManyField(ProductCategory)
    paymentMode = models.ManyToManyField(ModeOfPayment)
    is_featured = models.BooleanField(default=False,  blank=True, null=True)
    create_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    is_active = models.BooleanField(default=True, null=True)
    shipping_contract = models.TextField(blank=True, null=True)
    locality_shop = models.BooleanField(default=True,  blank=True, null=True)
    village_shop= models.BooleanField(default=False,  blank=True, null=True)
    cluster_shop= models.BooleanField(default=False,  blank=True, null=True)
    service_areas = models.ManyToManyField(Area, related_name="ShopServiceAreas")
    service_localities = models.ManyToManyField(Place ,related_name="ShopServicePlaces")
    service_villages  = models.ManyToManyField(Village, related_name="ShopServiceVillages")

    def __str__(self):
        return self.name


class Role(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class ServiceArea(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    areas = models.ManyToManyField('Area')
    places = models.ManyToManyField('Place')
    villages = models.ManyToManyField('Village')
    clusters = models.ManyToManyField('Cluster')
    districts = models.ManyToManyField('District')
    states = models.ManyToManyField('State')
    def __str__(self):
        return self.user.username

class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=11, blank=True, null=True)
    one_click_purchasing = models.BooleanField(default=False)
    is_customer = models.BooleanField(default=True)
    is_shop_owner = models.BooleanField(default=False)
    is_delivery_staff = models.BooleanField(default=False)
    is_staff_user = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True, null=True)
    user_role = models.ForeignKey(Role,null=True, on_delete=models.DO_NOTHING )
    create_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return self.user.username
    def get_place(self):
        try:
            address = Address.objects.filter(user=self.user).first()
            place = "place_id"
            place = getattr(address, place)
            return place
        except:
            return 0

class Candidate(models.Model):
    applicant = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.CharField(max_length=100, blank=True, null=True)
    address = models.TextField(max_length=100, blank=True, null=True)
    education = models.CharField(max_length=100, blank=True, null=True)
    experience = models.CharField(max_length=100, blank=True, null=True)
    create_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    def __str__(self):
        return self.name

class Taxi(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.CharField(max_length=100, blank=True, null=True)
    place = models.ForeignKey(Place, blank=True, null=True,
                              on_delete=models.CASCADE)
    village = models.ForeignKey(Village, blank=True, null=True,
                              on_delete=models.CASCADE)
    cluster = models.ForeignKey(Cluster,blank=True, null=True,
                              on_delete=models.CASCADE)
    district = models.ForeignKey(District,blank=True, null=True,
                              on_delete=models.CASCADE)
    state = models.ForeignKey(State, blank=True, null=True,
                              on_delete=models.CASCADE)
    create_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    def __str__(self):
        return self.name

class Cooli(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.CharField(max_length=100, blank=True, null=True)
    place = models.ForeignKey(Place, blank=True, null=True,
                              on_delete=models.CASCADE)
    village = models.ForeignKey(Village, blank=True, null=True,
                              on_delete=models.CASCADE)
    cluster = models.ForeignKey(Cluster,blank=True, null=True,
                              on_delete=models.CASCADE)
    district = models.ForeignKey(District,blank=True, null=True,
                              on_delete=models.CASCADE)
    state = models.ForeignKey(State, blank=True, null=True,
                              on_delete=models.CASCADE)
    create_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    def __str__(self):
        return self.name

class Compliant(models.Model):
    applicant = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.CharField(max_length=100, blank=True, null=True)
    order_number = models.CharField(max_length=100, blank=True, null=True)
    detail = models.TextField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=100, blank=True, null=True)
    create_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    def __str__(self):
        return self.name

class ProductImage(models.Model):
    name = models.CharField(max_length=100,blank=True, null=True)
    productCategory = models.ForeignKey(ProductCategory, blank=True, null=True,
                             on_delete=models.CASCADE)
    image1 = models.ImageField(upload_to='product',blank=True, null=True)
    image2 = models.ImageField(upload_to='product',blank=True, null=True)
    image3 = models.ImageField(upload_to='product',blank=True, null=True)
    def __str__(self):
        return self.name

class Item(models.Model):
    title = models.CharField(max_length=100, blank=True, null=True)
    title_local = models.CharField(max_length=100, blank=True, null=True)

    shop = models.ForeignKey(Shop,
                             on_delete=models.CASCADE)
    product_image = models.ForeignKey(ProductImage, blank=True, null=True,
                             on_delete=models.CASCADE)
    description = models.CharField(max_length=200, blank=True, null=True)

    productategory = models.ForeignKey(ProductCategory,
                                 on_delete=models.CASCADE, blank=True, null=True)                           
    is_available = models.BooleanField(default=False, null=True)
    is_featured = models.BooleanField(default=False,  blank=True, null=True)
    is_on_sale = models.BooleanField(default=False,  blank=True, null=True)
    create_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    is_active = models.BooleanField(default=False, null=True)

    def __str__(self):
        return self.title
    def get_category(self):
        return self.productategory.name
    def get_image(self):
        return self.product_image.image1.url
    def get_shop(self):
        return self.shop.name

class Variation(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    price = models.FloatField(blank=True, null=True)
    discount_price = models.FloatField(blank=True, null=True) 
    is_available = models.BooleanField(default=False, null=True) 

    class Meta:
        unique_together = (
            ('item', 'name')
        )

    def __str__(self):
        return self.name

class OrderItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    shop = models.ForeignKey(Shop,
                             on_delete=models.CASCADE, blank=True, null=True)
    place = models.ForeignKey(Place,
                              on_delete=models.CASCADE, blank=True, null=True)
    ordered = models.BooleanField(default=False)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    item_variation = models.ForeignKey(Variation, on_delete=models.CASCADE, blank=True, null=True)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.item.title}"

    def final_price(self):
        if self.item_variation:
            return self.quantity * self.item_variation.discount_price
        else: 
            return 0
          

class Address(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    # completeAddress = models.CharField(max_length=250, blank=True, null=True)

    area = models.ForeignKey(Area, blank=True, null=True,
                              on_delete=models.CASCADE)

    place = models.ForeignKey(Place, blank=True, null=True,
                              on_delete=models.CASCADE)
    village = models.ForeignKey(Village, blank=True, null=True,
                              on_delete=models.CASCADE)
    cluster = models.ForeignKey(Cluster,blank=True, null=True,
                              on_delete=models.CASCADE)
    district = models.ForeignKey(District,blank=True, null=True,
                              on_delete=models.CASCADE)
    state = models.ForeignKey(State, blank=True, null=True, on_delete=models.CASCADE)
    full_address = models.TextField(max_length=250, blank=True, null=True)
    phone_number = models.CharField(max_length=10, blank=True, null=True)
    
    create_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    is_active = models.BooleanField(default=True, null=True)
    def __str__(self):
        return self.user.username
    # def __str__(self):
    #     return self.user.username

    class Meta:
        verbose_name_plural = 'Addresses'

class OrderStatus(models.Model):
    name = models.CharField(max_length=100)
    can_update_by = models.CharField(max_length=100, blank=True, null=True)
    def __str__(self):
        return self.name

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    shop = models.ForeignKey(Shop,
                             on_delete=models.CASCADE, blank=True, null=True)

    address = models.ForeignKey(Address,
                             on_delete=models.CASCADE, blank=True, null=True)
    place = models.ForeignKey(Place,
                              on_delete=models.CASCADE, blank=True, null=True)
    paymentMode = models.ForeignKey(ModeOfPayment,
                              on_delete=models.CASCADE, blank=True, null=True)
    ref_code = models.CharField(max_length=20, blank=True, null=True)
    items = models.ManyToManyField(OrderItem)
    start_date = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField()
    ordered = models.BooleanField(default=False)
    coupon = models.ForeignKey(
        'Coupon', on_delete=models.SET_NULL, blank=True, null=True)
    order_status = models.ForeignKey(
        OrderStatus, default=1, blank=True, null=True, on_delete=models.SET_NULL)

    class Meta:
        ordering = ['start_date', 'pk']

    def __str__(self):
        return self.user.username
    
    def get_total(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.final_price()
        return total

    def get_items_count(self):
        total_item = self.items.count
        return total_item

class FavoritePlaces(models.Model):
        user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
        place = models.ForeignKey(Place,
                              on_delete=models.CASCADE)
        is_active = models.BooleanField(default=True, null=True)

        def __str__(self):
            return self.place.name

class FavoriteShops(models.Model):
        user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
        shop = models.ForeignKey(Shop,
                             on_delete=models.CASCADE)
        is_active = models.BooleanField(default=True, null=True)

        def __str__(self):
            return self.shop.name


class Coupon(models.Model):
    code = models.CharField(max_length=15)
    offer = models.TextField(max_length=250, blank=True, null=True)
    shops = models.ManyToManyField(Shop)
    places  = models.ManyToManyField(Place)
    min_amount = models.FloatField(null=True)
    start_date = models.DateTimeField(null=True)
    expiry_date = models.DateTimeField(null=True)
    is_only_once_per_user = models.BooleanField(default=True, null=True)
    is_universal = models.BooleanField(default=False, null=True)
    is_for_shop_only = models.BooleanField(default=False, null=True)
    is_for_place_only = models.BooleanField(default=False, null=True)
    is_valid = models.BooleanField(default=False, null=True)
    create_date = models.DateTimeField(auto_now_add=True,null=True)

    def __str__(self):
        return self.code

def userprofile_receiver(sender, instance, created, *args, **kwargs):
    if created:
        userprofile = UserProfile.objects.create(user=instance)

post_save.connect(userprofile_receiver, sender=settings.AUTH_USER_MODEL)
