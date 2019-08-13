from django.core.management.base import BaseCommand, CommandError
from shop.models import *
from prj.settings import BASE_DIR
import os
import sys
import yaml
from django.core.files import File
DATA_DIR = os.path.join(BASE_DIR,'..','data','pangardin.com.ua')

def import_catalog():
    # очищаем таблицы
    Subcategory.objects.all().delete()
    Category.objects.all().delete()
    Good.objects.all().delete()
    Image.objects.all().delete()
    for item in os.listdir(DATA_DIR):
        if os.path.isdir(os.path.join(DATA_DIR,item)):
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
                scat = Subcategory.objects.get(name_slug=yml_data['name_slug'])
            except:
                scat = Subcategory()
                scat.name = yml_data['name_ru']
                scat.name_slug = yml_data['name_slug']
                scat.category = cat
                scat.save()
            
            for item_good in os.listdir(os.path.join(DATA_DIR,item)):
                if os.path.isdir(os.path.join(DATA_DIR,item,item_good)):
                    import_goods(item_good,os.path.join(DATA_DIR,item),scat)

# функция импорта товаров

def import_goods(name_slug,path,sub_category):
    print('Importing ..... %s' % name_slug)
    # читаем meta.yml
    try:
        with open(os.path.join(path,name_slug,'meta.yml'),'r') as f:
            rez = f.read()
    except:
        return False
    # парсим yml формат
    yml_data = yaml.load(rez) 
    # сохраняем позицию товара
    g = Good()
    g.name = yml_data['name_ru']
    g.name_slug = yml_data['name_slug']
    g.desc = yml_data['description_ru']
    g.subcategory = sub_category
    g.save()

    # сохраняем картинки
    path_to_image = os.path.join(path,name_slug,'images','1.png')
    #print(path_to_image)
    
    img = Image()
    img.good = g
    img.save()
    file_name = '%s.png' % g.id
    with open(path_to_image, 'rb') as image_file:
        img.image.save(file_name,File(image_file),save=True)
    




class Command(BaseCommand):
    def handle(self, *args, **options):
        print('Importing data')
        import_catalog()