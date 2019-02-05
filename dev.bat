CALL cd ../jsql-js-core
CALL grunt
CALL cd ../jsql-angular7
CALL npm run build
CALL xcopy ..\jsql-angular7\dist ..\jsql-angular7-test-app\node_modules\jsql-angular7 /s /e /h
CALL cd ../jsql-angular7-test-app
CALL npm start
