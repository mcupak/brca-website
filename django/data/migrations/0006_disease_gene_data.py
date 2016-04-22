# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-02-10 16:52
from __future__ import unicode_literals

import csv
import os.path

from django.conf import settings
from django.db import migrations

from data.models import Variant, Disease, Gene


def load_from_csv(apps, schema_editor):
    
    entries = (
        (Disease, 'LShift_DiseaseSample.csv'),
        (Gene, 'LShift_GeneSample.csv')
    )

    for model, filename in entries:

        file_path = os.path.join(settings.BASE_DIR, 'data', 'resources', filename)
        with open(file_path) as data_file:
            reader = csv.reader(data_file)
            header = reader.next()

            for row in reader:

                row_dict = dict(zip(header, row))
                model.objects.create(**row_dict)


class Migration(migrations.Migration):
    dependencies = [
        ('data', '0005_disease_gene'),
    ]

    operations = [
        migrations.RunPython(load_from_csv),
    ]