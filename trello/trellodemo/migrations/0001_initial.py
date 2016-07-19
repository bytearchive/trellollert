# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-18 11:17
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Board',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('board_text', models.CharField(max_length=255)),
                ('created_by', models.CharField(max_length=255)),
                ('created_time', models.DateTimeField(verbose_name='Time of Creation')),
                ('last_modified', models.DateTimeField(verbose_name='Last Modified')),
            ],
        ),
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('card_text', models.CharField(max_length=255)),
                ('created_by', models.CharField(max_length=255)),
                ('created_time', models.DateTimeField(verbose_name='Time of Creation')),
                ('last_modified', models.DateTimeField(verbose_name='Last Modified')),
                ('board', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='trellodemo.Board')),
            ],
        ),
        migrations.CreateModel(
            name='List',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.CharField(max_length=1000)),
                ('created_by', models.CharField(max_length=255)),
                ('created_time', models.DateTimeField(verbose_name='Time of Creation')),
                ('last_modified', models.DateTimeField(verbose_name='Last Modified')),
                ('card', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='trellodemo.Card')),
            ],
        ),
    ]