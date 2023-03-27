import type { AWS } from "@serverless/typescript";
import {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  importProductsFile,
  importFileParser,
  catalogBatchProcess,
} from "./src/functions";
import {
  COUNT_TABLE_NAME,
  QUEUE_NAME,
  TABLE_NAME,
  TOPIC,
  UPLOAD_S3_BUCKET,
} from "./src/constants";
// in progress
const serverlessConfiguration: AWS = {
  service: "shop-service",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    region: "eu-west-1",
    name: "aws",
    runtime: "nodejs16.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "dynamodb:DescribeTable",
              "dynamodb:Query",
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:UpdateItem",
              "dynamodb:DeleteItem",
              "dynamodb:BatchWriteItem",
            ],
            Resource: `arn:aws:dynamodb:eu-west-1:*:table/${TABLE_NAME}`,
          },
          {
            Effect: "Allow",
            Action: [
              "dynamodb:DescribeTable",
              "dynamodb:Query",
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:UpdateItem",
              "dynamodb:DeleteItem",
              "dynamodb:BatchWriteItem",
            ],
            Resource: `arn:aws:dynamodb:eu-west-1:*:table/${COUNT_TABLE_NAME}`,
          },
          {
            Effect: "Allow",
            Action: [
              "s3:PutObject",
              "s3:GetObject",
              "s3:DeleteObject",
              "s3:ListBucket",
            ],
            Resource: [
              `arn:aws:s3:::${UPLOAD_S3_BUCKET}/*`,
              `arn:aws:s3:::${UPLOAD_S3_BUCKET}`,
            ],
          },
          {
            Effect: "Allow",
            Action: ["sqs:*"],
            Resource: `arn:aws:sqs:eu-west-1:*:${QUEUE_NAME}`,
          },
          {
            Effect: "Allow",
            Action: ["sns:*"],
            Resource: `arn:aws:sns:eu-west-1:*:${TOPIC}`,
          },
        ],
      },
    },
  },
  functions: {
    getProduct,
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    importProductsFile,
    importFileParser,
    catalogBatchProcess,
  },
  package: { individually: true },
  resources: {
    Resources: {
      ShopTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: TABLE_NAME,
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
      CountTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: COUNT_TABLE_NAME,
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
      SqsQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: QUEUE_NAME,
        },
      },
      SnsTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: TOPIC,
        },
      },
      SnsSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "drandalda27@gmail.com",
          Protocol: "email",
          TopicArn: {
            Ref: "SnsTopic",
          },
        },
      },
      SqsPolicy: {
        Type: "AWS::SQS::QueuePolicy",
        Properties: {
          PolicyDocument: {
            Id: "MyQueuePolicy",
            Version: "2012-10-17",
            Statement: [
              {
                Sid: "MyFirstStatement",
                Effect: "Allow",
                Principal: "*",
                Action: "sqs:SendMessage",
                Resource: {
                  "Fn::GetAtt": ["SqsQueue", "Arn"],
                },
                Condition: {
                  ArnEquals: {
                    "aws:SourceArn": {
                      Ref: "SnsTopic",
                    },
                  },
                },
              },
            ],
          },
          Queues: [
            {
              Ref: "SqsQueue",
            },
          ],
        },
      },
    },
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node18",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    dynamodb: {
      start: {
        port: 5000,
        inMemory: true,
        migrate: true,
      },
      stages: "dev",
    },
  },
};

module.exports = serverlessConfiguration;
