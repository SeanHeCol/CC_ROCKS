from elasticsearch import Elasticsearch, RequestsHttpConnection
host = "search-cc-es-mw36tntjqmv3pqo3rejs6upzpy.us-east-1.es.amazonaws.com"
es = Elasticsearch(
    hosts = [{'host': host, 'port': 443}],
    use_ssl = True,
    verify_certs = True,
    connection_class = RequestsHttpConnection
)

def lambda_handler(event, context):
    # TODO implement
    #return 'Hello from Lambda'
    name = event["movieName"]
    response = es.search(index="movies", doc_type="Movie", body={"query": {"match": {"title": name}}})
    return response
    
