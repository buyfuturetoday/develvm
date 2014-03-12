Python web apps

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Python web apps)
[meta:date]: <> (2013-06-09)
[meta:nested:key]: <> (Metadata value)

##!!truncate


Virtualenv is used here, have a look at: http://wip.herokuapp.com/130227_Update_Pyhton_Skills if you're unfamiliair with it.

Links:

 * http://werkzeug.pocoo.org/
 * http://gunicorn.org/


## Hello world in werkzeug


Create a virtual env:

```
virtualenv venv --distribute
source venv/bin/activate
```

Now pip, python etc. will refer to the virtual env:

```
(venv)Gizur-MacBook-ca00510e:werkzeug jonas$ which pip
/Users/jonas/git/colmsjo/python_sandbox/werkzeug/venv/bin/pip
```

hello.py:

```
from werkzeug.wrappers import Request, Response

@Request.application
def application(request):
    return Response('Hello World!')

if __name__ == '__main__':
    from werkzeug.serving import run_simple
    run_simple('localhost', 4000, application)
```

requirements.txt:

```
werkzeug
```

```
pip install -r requirements.txt
```

Run the web app

```
python hello.py
```


open http://localhost:4000/
