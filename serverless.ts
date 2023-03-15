import type { AWS } from "@serverless/typescript";
import {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  importProductsFile,
  importFileParser,
} from "./src/functions";
import {
  COUNT_TABLE_NAME,
  TABLE_NAME,
  UPLOAD_S3_BUCKET,
} from "./src/constants";

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
