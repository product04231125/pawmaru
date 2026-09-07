insert into categories (name, display_order) values ('강아지', 1), ('고양이', 2);

insert into products (category_id, name, description)
select id, '건강한 하루 오리 사료', '오리를 주원료로 만든 데일리 건식 사료입니다.' from categories where name = '강아지';
insert into products (category_id, name, description)
select id, '동결건조 연어 큐브', '한 입 크기의 연어 동결건조 간식입니다.' from categories where name = '고양이';
insert into products (category_id, name, description)
select id, '포근한 구름 방석', '사계절 사용할 수 있는 세탁 가능한 방석입니다.' from categories where name = '강아지';

insert into product_options (product_id, name, sku, price, stock_quantity)
select id, '1kg', 'DOG-FOOD-DUCK-1K', 21900, 30 from products where name = '건강한 하루 오리 사료';
insert into product_options (product_id, name, sku, price, stock_quantity)
select id, '80g', 'CAT-TREAT-SALMON-80', 8900, 50 from products where name = '동결건조 연어 큐브';
insert into product_options (product_id, name, sku, price, stock_quantity)
select id, 'M / 크림', 'BED-CLOUD-M-CREAM', 32900, 15 from products where name = '포근한 구름 방석';

