from django.db import models
from django.utils.safestring import mark_safe

class Category(models.Model):
    ''' Категории  '''
    name = models.CharField(max_length=250)
    name_slug = models.CharField(max_length=250)
    def __str__(self):
        return self.name

class Subcategory(models.Model):
    ''' Подкатегории  '''
    name = models.CharField(max_length=250)
    name_slug = models.CharField(max_length=250)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL,  null=True)
    def __str__(self):
        return self.name

class Good(models.Model):
    ''' Товары  '''
    name = models.CharField(max_length=250)
    name_slug = models.CharField(max_length=250)
    desc = models.TextField()
    subcategory = models.ForeignKey(Subcategory, on_delete=models.SET_NULL,  null=True)
    def __str__(self):
        return self.name
        

class Image(models.Model):
    ''' Изображения  '''
    good = models.ForeignKey(Good, on_delete=models.SET_NULL, null=True)
    image = models.ImageField()

    @property
    def image_tag(self):
        return mark_safe('<img width="100" src="%s" />' % self.image.url)
