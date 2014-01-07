from fabric.api import local

#
# This is a small fabfile developed for learning purposes
#
# Examples: 
# >fab prepare_deploy
# >fab hello:name=MYNAME
#

def hello(name="world"):
    print("Hello %s!" % name)


#
# Run unit tests
#
# An alternative way to set PYTHONPATH is to edit bin/activate
#

def test():
    local("PYTHONPATH=tests ./bin/python -m test1")

#
# Generate documentation
#

def doc():
    local("./bin/pycco tests/*.py")


