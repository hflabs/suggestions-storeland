# Подсказки DaData.ru для Storeland

Инструкция по подключению подсказок DaData.ru к платформе StoreLand.

1. Открыть редактор шаблонов StoreLand (доступен по ссылке http://код магазина.storeland.ru/admin/site_templates)
2. Выбрать подраздел шаблон HTML
3. Добавить ссылку на css-файл Подсказок из [примера подключения](https://dadata.ru/suggestions/usage/) в подраздел "Стили магазина" 
![image](screenshots/css.png)
4. Добавить ссылку на js-файл Подсказок из [примера подключения](https://dadata.ru/suggestions/usage/) в конец шаблона 
![image]((screenshots/js.png))
5. Добавляем ссылку для инициализации скрипта на основных формах магазина в конец шаблона (под результат из шага 4):
```
<script type="text/javascript">
window.DADATA_TOKEN = "ВАШ_API_КЛЮЧ";
</script>
<script type="text/javascript" src="https://cdn.rawgit.com/hflabs/suggestions-storeland/0.1.0/init.js"></script>
```
Здесь необходимо задать API-ключ. Для получения нужно [зарегистрироваться](https://dadata.ru/#registration_popup) на DaData.ru и увидеть ключ в [Личном Кабинете](https://dadata.ru/profile/#info).
При регистрации необходимо подтвердить e-mail адрес, иначе Подсказки не будут работать.