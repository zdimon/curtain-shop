from django.contrib import admin
from .models import *


class CategoryAdmin(admin.ModelAdmin):
    pass

class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'category']
    list_filter = ['category']
    

class GoodAdmin(admin.ModelAdmin):
    list_display = ['name', 'name_slug', 'subcategory']

class ImageAdmin(admin.ModelAdmin):
    list_display = ['image', 'image_tag', 'good']

admin.site.register(Category, CategoryAdmin)
admin.site.register(Subcategory,SubcategoryAdmin)
admin.site.register(Good, GoodAdmin)
admin.site.register(Image, ImageAdmin)
