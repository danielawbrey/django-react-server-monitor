from django.shortcuts import render
from django.http import HttpResponse, request

def homePageView(request):
    return render(request=request, template_name='home.html')