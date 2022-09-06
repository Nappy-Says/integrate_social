from django.http import HttpResponseNotFound
from django.shortcuts import render
from account.models import Account
from django.contrib.auth.decorators import login_required


@login_required
def profile(request):

	user_query = Account.objects.filter(Account.user==1)

	if not user_query.exists():
		return HttpResponseNotFound

	context = {
		"first_last_name": user_query.user.first_name + user_query.user.last_name
	}
	return render(request, template_name='pages/index.html', context=context)
