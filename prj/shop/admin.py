from django.contrib import admin
from .models import *


class CategoryAdmin(admin.ModelAdmin):
    pass

class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'category']
    list_filter = ['category']
    

class GoodAdmin(admin.ModelAdmin):
    pass

class ImageAdmin(admin.ModelAdmin):
    pass

admin.site.register(Category, CategoryAdmin)
admin.site.register(Subcategory,SubcategoryAdmin)
admin.site.register(Good, GoodAdmin)
admin.site.register(Image, ImageAdmin)
