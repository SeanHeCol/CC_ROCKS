from elasticsearch import Elasticsearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth
import requests
# import boto3
# client = boto3.client(
#     'es',
#     region_name='us-east-1', 
#     aws_access_key_id='',
#     aws_secret_access_key='',
# )
INDEX_NAME="predictions"

AWS_ACCESS_KEY = ''
AWS_SECRET_KEY = ''
region = 'us-east-1' # For example, us-east-1
service = 'es'
awsauth = AWS4Auth(AWS_ACCESS_KEY, AWS_SECRET_KEY, region, service)

# host = ""
host = ""
path = 'predictions'
url = host + path

es = Elasticsearch(
    hosts = [{'host': host, 'port': 443}],
    http_auth = awsauth,
    use_ssl = True,
    verify_certs = True,
    connection_class = RequestsHttpConnection
)

if es.indices.exists(INDEX_NAME):
    print("deleting '%s' index..." % (INDEX_NAME))
    res = es.indices.delete(index = INDEX_NAME)
    print(" response: '%s'" % (res))
exit()

payload = {
    "settings" : {
        "number_of_shards" : 7,
        "number_of_replicas" : 2
    }
}

r = requests.put(url, auth=awsauth, json=payload)
print(r.text)
exit()

es = Elasticsearch(
    hosts = [{'host': host, 'port': 443}],
    http_auth = awsauth,
    use_ssl = True,
    verify_certs = True,
    connection_class = RequestsHttpConnection
)

print es
exit()
if es.indices.exists(INDEX_NAME):
    print("deleting '%s' index..." % (INDEX_NAME))
    res = es.indices.delete(index = INDEX_NAME)
    print(" response: '%s'" % (res))

request_body = {
    "settings" : {
        "number_of_shards": 1,
        "number_of_replicas": 0
    }
}

print("creating '%s' index..." % (INDEX_NAME))
res = es.indices.create(index = INDEX_NAME, body = request_body)
print(" response: '%s'" % (res))
exit()

# document = {
#     "title": "Moneyball",
#     "director": "Bennett Miller",
#     "year": "2011"
# }

response = es.index(index="predictions", doc_type="Prediction")
print response


# print(es.get(index="movies", doc_type="movie", id="5"))
