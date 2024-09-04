# LangChainのBedrockChatをLambdaでの実行する

## 概要
BedrockをLangChainから呼び出す処理をAWS Lambdaで実行するためのリポジトリです。

## 参考

[【生成AI】AWS Lambda(Python) と LangChain(LCEL) を使ってストリーミング出力したい](https://blog.serverworks.co.jp/gen-ai-aws-lambda-streaming)

[FastAPI Response Streaming](https://github.com/awslabs/aws-lambda-web-adapter/blob/main/examples/fastapi-response-streaming-zip/README.md)

## Deploy手順

```bash
sam build
export OUR_API_KEY=ランダムな文字列を指定

sam deploy --parameter-overrides ApiKey=${OUR_API_KEY} --guided

# 以下は入力例です。
Configuring SAM deploy
======================

        Looking for config file [samconfig.toml] :  Not found

        Setting default arguments for 'sam deploy'
        =========================================
        Stack Name [sam-app]: 
        AWS Region [ap-northeast-1]: us-east-1
        Parameter ApiKey: #APIキーを入力
        #Shows you resources changes to be deployed and require a 'Y' to initiate deploy
        Confirm changes before deploy [y/N]: y
        #SAM needs permission to be able to create roles to connect to the resources in your template
        Allow SAM CLI IAM role creation [Y/n]: Y
        #Preserves the state of previously provisioned resources when an operation fails
        Disable rollback [y/N]: N
        FastAPIFunction Function Url has no authentication. Is this okay? [y/N]: y  ← APIキーをLambda内で検証
        Save arguments to configuration file [Y/n]: Y
        SAM configuration file [samconfig.toml]: 
        SAM configuration environment [default]: 

~ しばらく待つと以下のメッセージが表示される ~

Previewing CloudFormation changeset before deployment
======================================================
Deploy this changeset? [y/N]: y

~ 最終的にデプロイが成功すると以下のように、LambdaのARNおよびFunction URLが表示される ~

CloudFormation outputs from deployed stack
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Outputs                                                                                                                                                                                                                                      
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Key                 FastAPIFunction                                                                                                                                                                                                          
Description         FastAPI Lambda Function ARN                                                                                                                                                                                              
Value               arn:aws:lambda:us-east-1:999999999999:function:sam-app-FastAPIFunction-XXXXXXXXXX                                                                                                                                      

Key                 FastAPIFunctionUrl                                                                                                                                                                                                       
Description         Function URL for FastAPI function                                                                                                                                                                                        
Value               https://XXXXXXXXXX.lambda-url.us-east-1.on.aws/                                                                                                                                                    
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

```


## curlによるテスト

```bash

curl -X POST \
-H "Content-Type: application/json" \
-H "X-API-Key: ${OUR_API_KEY}" \
-d '{"question": "カナダの首都は？"}' \
https://XXXXXXXXXX.lambda-url.us-east-1.on.aws/api/qa

# 以下のようなレスポンスが返ってくる
カナダの首都はオタワ（Ottawa）です。

オタワに関する主な情報：

1. 場所：オンタリオ州東部に位置し、ケベック州との州境に近い。

2. 人口：約100万人（都市圏を含む）

3. 公用語：英語とフランス語（カナダは公式に二言語国家）

4. 主要な政府機関：連邦議会議事堂、首相官邸、総督官邸など

5. 観光名所：リドー運河、カナダ国立美術館、平和の塔など

6. 気候：大陸性気候で、夏は暖かく冬は寒い

7. 経済：政府機関や技術産業が主要な雇用源

オタワは1857年にビクトリア女王によってカナダの首都に選ばれました。トロントやモントリオールなどの大都市と比べると小さめですが、政治の中心地として重要な役割を果たしています。
```

