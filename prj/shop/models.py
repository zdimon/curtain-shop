from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=250)
    name_slug = models.CharField(max_length=250)
    def __str__(self):
        return self.name

class Subcategory(models.Model):
    name = models.CharField(max_length=250)
    name_slug = models.CharField(max_length=250)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL,  null=True)
    def __str__(self):
        return self.name

class Good(models.Model):
    name = models.CharField(max_length=250)
    name_slug = models.CharField(max_length=250)
    desc = models.TextField()
    subcategory = models.ForeignKey(Subcategory, on_delete=models.SET_NULL,  null=True)

class Image(models.Model):
    good = models.ForeignKey(Good, on_delete=models.SET_NULL, null=True)
    image = models.ImageField()