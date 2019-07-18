# Подсказки DaData.ru для Storeland

Подсказки «[Дадаты](https://dadata.ru/suggestions/)» для [StoreLand](http://storeland.ru/) — удобный способ ввести ФИО, адрес и e-mail на форме заказа и в профиле клиента.

Инструкция по подключению подсказок к платформе Storeland:

1. В админке магазина перейти в раздел _Сайт > Редактор шаблонов_.

2. В левом меню выбрать подраздел _Шаблоны > HTML_.
   ![image](screenshots/2point.png)

3. Добавить ссылку на css-файл Подсказок в блок «Стили магазина» (они в районе 20–30 строки):

```
<!-- dadata.ru -->
<link href="https://cdn.jsdelivr.net/npm/suggestions-jquery@latest/dist/css/suggestions.min.css" type="text/css" rel="stylesheet" />
<!-- /dadata.ru -->
```

4. Добавить код инициализации подсказок в конец шаблона, но до закрывающего тега `</body>`:

```
<!-- dadata.ru -->
<script src="https://cdn.jsdelivr.net/npm/suggestions-jquery@latest/dist/js/jquery.suggestions.min.js"></script>
<script>
  window.DADATA_TOKEN = "ВАШ_API_КЛЮЧ";
</script>
<script src="https://unpkg.com/suggestions-storeland@0.3.0/init.js"></script>
<!-- /dadata.ru -->
```

Вместо `ВАШ_API_КЛЮЧ` укажите ваш API-ключ на DaData.ru. Чтобы получить ключ, [зарегистрируйтесь](https://dadata.ru/#registration_popup) и сгенерируйте ключ в [личном кабинете](https://dadata.ru/profile/#info).

После регистрации подтвердите e-mail адрес, иначе подсказки не будут работать.

5. Нажать на кнопку «СОХРАНИТЬ».
