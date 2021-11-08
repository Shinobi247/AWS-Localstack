# Setup

### [LocalStack Docs](https://github.com/localstack/localstack)

### [AWS Function API Docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SecretsManager.html)

## Docker

    - Run Docker Application
    - Run `docker-compose up`

## LocalStack spins up the following core Cloud APIs on your local machine.

### Note: Starting with version 0.11.0, all APIs are exposed via a single edge service, which is accessible on `http://localhost:4566` by default (customizable via EDGE_PORT, see further below).

### Access services with localhost `http://localhost:4566/services(single_word)`

### Example `http://localhost:4566/dynamodb`

    - ACM
    - API Gateway
    - CloudFormation
    - CloudWatch
    - CloudWatch Logs
    - DynamoDB
    - DynamoDB Streams
    - EC2
    - Elasticsearch Service
    - EventBridge (CloudWatch Events)
    - Firehose
    - IAM
    - Kinesis
    - KMS
    - Lambda
    - Redshift
    - Route53
    - S3
    - SecretsManager
    - SES
    - SNS
    - SQS
    - SSM
    - StepFunctions
    - STS

# Helpfuls

## Export Docker Images

### `docker save -o localstack.tar localstack/localstack`

## Import Docker Images

### `docker load --input localstack.tar`


test2
2232