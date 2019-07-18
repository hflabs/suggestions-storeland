# Подсказки DaData.ru для Storeland

Подсказки DaData.ru для Storeland — удобный способ ввести ФИО, адрес и e-mail на форме заказа и в профиле клиента.

<img src="screenshots/result.png" width="600">

Инструкция по подключению подсказок DaData.ru к платформе [StoreLand](http://storeland.ru/):

1. Открыть редактор шаблонов: `http://код_магазина.storeland.ru/admin/site_templates`.

2. Выбрать подраздел Шаблоны > HTML.
![image](screenshots/2point.png)

3. Добавить ссылку на css-файл Подсказок в блок «Стили магазина»:
```
<!-- dadata.ru -->
<link href="https://cdn.jsdelivr.net/npm/suggestions-jquery@latest/dist/css/suggestions.min.css" type="text/css" rel="stylesheet" />
<!-- /dadata.ru -->
```

4. Добавить ссылку на js-файл Подсказок в конец шаблона:
```
<!-- dadata.ru -->
<script src="https://cdn.jsdelivr.net/npm/suggestions-jquery@latest/dist/js/jquery.suggestions.min.js"></script>
<!-- /dadata.ru -->
```

5. Добавить код инициализации подсказок в конец шаблона (под результат из шага 4):
```
<!-- dadata.ru -->
<script>
  window.DADATA_TOKEN = "ВАШ_API_КЛЮЧ";
</script>
<script src="https://unpkg.com/suggestions-storeland@0.3.0/init.js"></script>
<!-- /dadata.ru -->
```

Вместо `ВАШ_API_КЛЮЧ` укажите ваш API-ключ на DaData.ru. Чтобы получить ключ,  [зарегистрируйтесь](https://dadata.ru/#registration_popup) и сгенерируйте ключ в [личном кабинете](https://dadata.ru/profile/#info).

После регистрации подтвердите e-mail адрес, иначе подсказки не будут работать.
