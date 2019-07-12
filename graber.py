#!/usr/bin/env python
# импортируем библиотеки
import requests
from bs4 import BeautifulSoup
print("Prepearing")
import os
from slugify import slugify
import sys
import shutil

DATA_DIR = os.path.join('data','pangardin.com.ua')

####Функции##################

def save_goods(url,category):
    # Получаем станицу категории
    r = requests.get(url)
    soup = BeautifulSoup(r.text, 'html.parser')    
    # находим список товаров
    products = soup.find('ul',{'class': 'products'}).findAll('li')    
    for product in products:
        # заголовок
        title = product.find('div',{'class': 'inner_product_header'}).find('h3').text
        title_slug = slugify(title)        
        # фоормируем путь
        path = os.path.join(DATA_DIR,category,title_slug)
        # создаем каталог товара
        print("Saving ... %s" % title_slug)
        if not os.path.isdir(path):
            os.mkdir(path)  
        # находим ссылку на страницу товара
        link = product.find('div',{"class": "inner_cart_button"}).find('a').get('href')
        # сохраняем позицию
        save_position(link,path)
    #sys.exit('done')

def save_position(link,path):
    try:
        r = requests.get(link)
    except:
        return True
    with open('log.html','w') as f:
        f.write(r.text)
    soup = BeautifulSoup(r.text, 'html.parser')
    print(link)
    #sys.exit('s')
    # находим ссылку на изображение
    img_link = soup.find('a',{"class": "MagicZoomPlus"}).get('href')
    print("Downloading pic %s" % img_link)
    # забираем картинку
    r = requests.get(img_link, stream=True)
    # создаем каталог images
    path_to_img = os.path.join(path,'images')
    if not os.path.isdir(path_to_img):
        os.mkdir(path_to_img)    
    # сохраняем картинку
    image_full_path = os.path.join(path_to_img,'1.png')
    if r.status_code == 200:
        with open(image_full_path, 'wb') as f:
            r.raw.decode_content = True
            shutil.copyfileobj(r.raw, f)    
    # находим название и описание
    title = soup.find('h1',{"class": "product_title"}).text  
    description = soup.find('div',{"itemprop": "description"}).text
    # формируем содержимое meta.yml
    meta_info = '''
name_slug: %s
name_ru: %s
meta_title_ru: %s
meta_keywords_ru: %s
meta_description_ru: %s
is_published: true
description_ru: 
   "%s"
''' % (slugify(title),title,title,title,title,description)
    # запись в файл
    with open(os.path.join(path,'meta.yml'),'w') as f:
        f.write(meta_info)        










def save_category(cat_name,parent_name):
    #сохранение каталогов-категорий
    # транслитерируем русское название категории
    cat_name_slug = slugify(cat_name)
    # транслитерируем русское название подкатегории
    parent_name_slug = slugify(parent_name)
    # выводим отладочное сообщение в консоль
    print("Creating category %s with parent %s" % (cat_name,parent_name))
    # формируем путь для для создания каталога
    dir_name = os.path.join(DATA_DIR,cat_name_slug)
    # создаем каталог, если его не существует
    if not os.path.isdir(dir_name):
        os.mkdir(dir_name)
    # создаем строку в которую вставляем названия категорий
    meta_info = '''
        content_type: category
        is_published: true
        name_slug: %s
        name_ru: %s
        parent_slug: %s
        parent_name_ru: %s
        order: 1
        descr: |
        ''' % (cat_name_slug,cat_name,parent_name_slug,parent_name)
    # сохраняем в файл
    with open(os.path.join(dir_name,'meta.yml'),'w') as f:
        f.write(meta_info)
    return cat_name_slug


##############################

# создаем каталог с данными
if not os.path.isdir('data'):
    os.makedirs('data/pangardin.com.ua')
print("Getting catalog")
# делаем запрос на получение главной страницы 
url = 'https://pangardin.com.ua'
r = requests.get(url)
# распознаем HTML, создавая специальный объект soup 
soup = BeautifulSoup(r.text, 'html.parser')
# находим главный (родительский) элемент списка категорий
ulsout = soup.find('ul',{'class': 'sub-menu'})
# в цикле проходим по всем его элементам 
for ulout in ulsout:
    liout = ulout.find('li')
    if liout != -1:
        #print('*'+liout.text)
        # для каждой родительской категории находим дочерний список подкатегорий
        ulins = ulout.find('ul')
        # в цикле проходим по подкатегориям 
        for liin in ulins.findAll('li'):
            link = liin.find('a')['href']
            print(link)
            category = save_category(liin.text, liout.text)
            save_goods(link, category)