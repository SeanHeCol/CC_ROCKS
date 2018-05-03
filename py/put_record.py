import boto3
import datetime
import pickle
import json

client = boto3.client(
    'dynamodb',
    region_name='us-east-1', 
    aws_access_key_id='AKIAJMQQ2UB7M7X4HDMQ',
    aws_secret_access_key='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',
)
# Business ID, Name, Address, Coordinates, Number of Reviews, Rating, Zip Code
"""all_res = pickle.load(open("raw_data.pickle",'rb'))

for key, value in all_res.items():
    print value['id'], value['name'], \
    value['location']['display_address'], value['coordinates']['latitude'], value['coordinates']['longitude'], \
    value['review_count'], value['rating'], value['location']['zip_code']
"""
meta = json.loads(open("meta_data.json").read(),strict=False)
print(meta[0])
ids = json.loads(open("tmdbids.json").read(),strict=False)
url = json.loads(open("urls.json").read(),strict=False)
#exit()
titles = json.loads(open("title.json").read(),strict=False)
#exit()

# now_time = str(datetime.datetime.now())
import math
count = 0
for key,value,image,title in zip(ids,meta,url,titles):
    #print key,value
    if count % 100 == 0:
        print (count)
    count += 1
    if math.isnan(key):
        continue
    response = client.put_item(TableName='movieReview', \
                    Item={
                        'movieId' : {"S": str(int(key))},
                        'ratings' : {"S": "Unkown" if (value["ratings"] == None) else str(value["ratings"])},
                        'release_date':{"S": "Unkown" if (value["release_date"] == None or len(value["release_date"]) == 0) else value["release_date"]},
                        "genres":{"S": "Unkown" if (value["genres"] == None or len(value["genres"]) == 0) else "&".join(map(lambda g:g['name'],value["genres"]))},
                        "overview":{"S":"Unkown" if (value["overview"] == None or len(value["overview"]) == 0) else value["overview"]},
                        "image":{"S": image},
                        "title":{"S":title}})
    #print (response)
    """print value['genres']
                Item={
                        'movieId' : {"S": key},
                        'ratings' : {"S": str(value["ratings"])},
                        'release_date':{"S":value["release_date"]},
                        "genres":{"L": [] if value["genres"] == None else map(lambda g:g['name'],value["genres"])},
                        "overview":{"S":value["overview"]}
                        }
                   
                print(Item)"""
# print client