# Подсказки DaData.ru для Storeland
Подсказки DaData.ru – удобный способ ввести ФИО и адрес, e-mail и реквизиты компаний.

Инструкция по подключению подсказок DaData.ru к платформе StoreLand.
![image](screenshots/result.png)

1. Открыть редактор шаблонов StoreLand – доступен по ссылке http://код магазина.storeland.ru/admin/site_templates

2. Выбрать подраздел шаблон HTML

3. Добавить ссылку на css-файл Подсказок из [примера подключения](https://dadata.ru/suggestions/usage/) в подраздел "Стили магазина"
![image](screenshots/css.png)
4. Добавить ссылку на js-файл Подсказок из [примера подключения](https://dadata.ru/suggestions/usage/) в конец шаблона
![image](screenshots/js.png)
5. Добавить ссылку для инициализации скрипта на основных формах магазина в конец шаблона (под результат из шага 4):
```
<script type="text/javascript">
window.DADATA_TOKEN = "ВАШ_API_КЛЮЧ";
</script>
<script type="text/javascript" src="https://cdn.rawgit.com/hflabs/suggestions-storeland/0.1.0/init.js"></script>
```
Здесь необходимо задать API-ключ. 
Чтобы получить ключ, нужно [зарегистрироваться](https://dadata.ru/#registration_popup) на DaData.ru. После этого можно сгенерировать ключ в [Личном Кабинете](https://dadata.ru/profile/#info).
После регистрации необходимо подтвердить e-mail адрес, иначе Подсказки не будут работать.

В итоге Подсказки будут работать на всех формах в StoreLand и помогут без ошибок ввести ФИО, e-mail и адрес.
