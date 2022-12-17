from django.shortcuts import render
from django.http import HttpResponse, request

def homePageView(request):
    # return HttpResponse('Hello World')
    return render(request=request, template_name='home.html')