from django.core.management.base import BaseCommand, CommandError
from shop.models import *
from prj.settings import BASE_DIR
import os
import sys
import yaml
DATA_DIR = os.path.join(BASE_DIR,'..','data','pangardin.com.ua')

def import_catalog():
    # удалим все подкатегории и категории и товары
    Subcategory.objects.all().delete()
    Category.objects.all().delete()
    Good.objects.all().delete()
    for item in os.listdir(DATA_DIR):
        if os.path.isdir(os.path.join(DATA_DIR,item)):
            print(item)
            # читаем meta.yml
            with open(os.path.join(DATA_DIR,item,'meta.yml'),'r') as f:
                rez = f.read()
            # парсим yml формат
            yml_data = yaml.load(rez)
            print(yml_data['name_ru'])
            # создаем категории в базе если такой нет
            try: 
                cat = Category.objects.get(name_slug=yml_data['parent_slug'])
            except:
                cat = Category()
                cat.name = yml_data['parent_name_ru']
                cat.name_slug = yml_data['parent_slug']
                cat.save()
            # создаем подкатегории в базе если такой нет
            try: 
                Subcategory.objects.get(name_slug=yml_data['name_slug'])
            except:
                scat = Subcategory()
                scat.name = yml_data['name_ru']
                scat.name_slug = yml_data['name_slug']
                scat.category = cat
                scat.save()
            
            for item_good in os.listdir(os.path.join(DATA_DIR,item)):
                if os.path.isdir(os.path.join(DATA_DIR,item,item_good)):
                    import_goods(item_good,os.path.join(DATA_DIR,item))

# функция импорта товаров

def import_goods(name_slug,path):
    print('Importing ..... %s' % name_slug)
    # читаем meta.yml
    with open(os.path.join(path,name_slug,'meta.yml'),'r') as f:
        rez = f.read()
    # парсим yml формат
    yml_data = yaml.load(rez) 
    print(yml_data)
    # сохраняем позицию товара
    g = Good()
    g.name = yml_data['name_ru']
    g.name_slug = yml_data['name_slug']
    g.desc = yml_data['description_ru']
    g.save()




class Command(BaseCommand):
    def handle(self, *args, **options):
        print('Importing data')
        import_catalog()