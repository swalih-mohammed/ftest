# from django.shortcuts import render

# Create your views here.
from django.shortcuts import render


def index(request):
    # print("index")
    return render(request, 'index.html')


def sw(request):
    print("sw")
    return render(request, 'serviceworker.js')
