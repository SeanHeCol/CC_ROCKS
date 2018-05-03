from elasticsearch import Elasticsearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth
import requests
import csv

INDEX_NAME="predictions"

AWS_ACCESS_KEY = ''
AWS_SECRET_KEY = ''
region = 'us-east-1' # For example, us-east-1
service = 'es'

awsauth = AWS4Auth(AWS_ACCESS_KEY, AWS_SECRET_KEY, region, service)

# host ="https://search-cuisine-lq7fy4olttttba6y4hwyq7eub4.us-east-1.es.amazonaws.com/" 

host = ""
path = 'predictions'
url = host + path

# payload = {
#     "settings" : {
#         "number_of_shards" : 7,
#         "number_of_replicas" : 2
#     },
#     "mappings" :{
#         "Prediction":{
#             "properties": {
#                 "RestaurantID": {"type":"text"},
#                 "Cuisine": {"type": "text"},
#                 "Score":{"type":"float"}
#             }
#         }
#     }
# }

# RestaurantID, Cuisine, Score,

# r = requests.put(url, auth=awsauth, json=payload)
# print(r.text)
# exit()

# host = "search-cuisine-lq7fy4olttttba6y4hwyq7eub4.us-east-1.es.amazonaws.com"

host = "search-cc-es-mw36tntjqmv3pqo3rejs6upzpy.us-east-1.es.amazonaws.com"
# es= Elasticsearch()
es = Elasticsearch(
    hosts = [{'host': host, 'port': 443}],
    http_auth = awsauth,
    use_ssl = True,
    verify_certs = True,
    connection_class = RequestsHttpConnection
)

# if es.indices.exists(INDEX_NAME):
#     print("deleting '%s' index..." % (INDEX_NAME))
#     res = es.indices.delete(index = INDEX_NAME)
#     print(" response: '%s'" % (res))

# exit()
# print(es.get(index="predictions", doc_type="Prediction", id="XKDHsS8PevoEdFLNtt05FA"))
# res = es.search(index="test-index", body={"query": {"match_all": {}}})
response = es.search(index="predictions", doc_type="Prediction", body={"query": {"match": {"Cuisine": "chinese"}}})['hits']['hits']
for i in range(5):
    print response[i]['_source']['RestaurantID']

# print len(response['hits']['hits'])
exit()

with open('./final_rec.csv','r') as ifile:
    reader = csv.reader(ifile)
    next(reader)
    for row in reader:
        document ={}
        RestaurantID = row[3]
        Cuisine = row[0]
        Score = row[-1]
        # document = {
        #     'RestaurantID': RestaurantID,
        #     'Cuisine': Cuisine,
        #     'Score':Score,
        # }
        document['RestaurantID'] = RestaurantID
        document['Cuisine'] = Cuisine 
        document['Score'] = Score
        response = es.index(index="predictions", doc_type="Prediction", id = RestaurantID , body = document)

# print(response)
# print(es.get(index="predictions", doc_type="Prediction", id="XKDHsS8PevoEdFLNtt05FA"))



