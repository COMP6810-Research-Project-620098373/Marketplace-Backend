# Marketplace Backend
This project contains the framework for the regulatory feature of Marketplace frontend application. The file **./src/model/ItemClassifications.ts** can be tweaked to moderate images and the file **./assets/train.txt** can be tweaked to moderate textual data.

## Getting Started

1. ### **Installing Dependencies**
    Install dependencies using the following command:
    ```
    npm install
    ```

2. ### **Generate SSL Certificates** - Optional
    For security purposes it is encouraged that SSL / HTTPS is enabled on the server. For this the SSL certificate located in the **./sslcert** folder will have to be regenerated. Use the following command to regenerate SSL certifcate:
    ```
    openssl req -x509 -sha256 -nodes -days 365000 -newkey rsa:4096 -keyout ./sslcert/key.pem -out ./sslcert/cert.pem
    ```

3. ### **Start Project**
    Run this project using:
    ```
    npm start
    ```