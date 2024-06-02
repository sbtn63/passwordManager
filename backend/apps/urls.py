from django.urls import path

from .views import CreateAppView, AppListView, DescryptAppView, AppDeleteView, AppUpdateView

urlpatterns = [
    path('', CreateAppView.as_view(), name='create_app'),
    path('list/', AppListView.as_view(), name='apps'),
     path('<int:pk>/update/', AppUpdateView.as_view(), name="update_app"),
    path('<int:pk>/delete/', AppDeleteView.as_view(), name="delete_app"),
    path('<int:pk>/descrypt/', DescryptAppView.as_view(), name='descrypt')
]
