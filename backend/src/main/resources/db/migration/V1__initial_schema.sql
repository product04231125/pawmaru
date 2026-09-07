create table members (
    id bigserial primary key,
    email varchar(255) not null unique,
    password_hash varchar(255) not null,
    name varchar(100) not null,
    phone varchar(30),
    role varchar(20) not null default 'USER' check (role in ('USER', 'ADMIN')),
    status varchar(20) not null default 'ACTIVE' check (status in ('ACTIVE', 'WITHDRAWN', 'SUSPENDED')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table addresses (
    id bigserial primary key,
    member_id bigint not null references members(id),
    recipient varchar(100) not null,
    phone varchar(30) not null,
    postal_code varchar(10) not null,
    address1 varchar(255) not null,
    address2 varchar(255),
    is_default boolean not null default false,
    created_at timestamptz not null default now()
);

create table pets (
    id bigserial primary key,
    member_id bigint not null references members(id),
    name varchar(100) not null,
    species varchar(30) not null,
    breed varchar(100),
    birth_date date,
    created_at timestamptz not null default now()
);

create table categories (
    id bigserial primary key,
    parent_id bigint references categories(id),
    name varchar(100) not null,
    display_order integer not null default 0,
    created_at timestamptz not null default now()
);

create table products (
    id bigserial primary key,
    category_id bigint not null references categories(id),
    name varchar(200) not null,
    description text not null default '',
    status varchar(20) not null default 'ON_SALE' check (status in ('ON_SALE', 'SOLD_OUT', 'HIDDEN')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index idx_products_category_status on products(category_id, status);
create index idx_products_name on products(name);

create table product_options (
    id bigserial primary key,
    product_id bigint not null references products(id),
    name varchar(100) not null,
    sku varchar(100) not null unique,
    price numeric(12, 0) not null check (price >= 0),
    stock_quantity integer not null default 0 check (stock_quantity >= 0),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table product_images (
    id bigserial primary key,
    product_id bigint not null references products(id) on delete cascade,
    image_url varchar(1000) not null,
    display_order integer not null default 0
);

create table carts (
    id bigserial primary key,
    member_id bigint not null unique references members(id),
    created_at timestamptz not null default now()
);

create table cart_items (
    id bigserial primary key,
    cart_id bigint not null references carts(id) on delete cascade,
    product_option_id bigint not null references product_options(id),
    quantity integer not null check (quantity > 0),
    unique(cart_id, product_option_id)
);

create table orders (
    id bigserial primary key,
    member_id bigint not null references members(id),
    order_number varchar(30) not null unique,
    status varchar(30) not null check (status in ('PENDING', 'PAID', 'PREPARING', 'SHIPPED', 'DELIVERED', 'CANCELLED')),
    total_amount numeric(12, 0) not null check (total_amount >= 0),
    recipient varchar(100) not null,
    phone varchar(30) not null,
    postal_code varchar(10) not null,
    shipping_address varchar(500) not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index idx_orders_member_created on orders(member_id, created_at desc);

create table order_items (
    id bigserial primary key,
    order_id bigint not null references orders(id),
    product_option_id bigint not null references product_options(id),
    product_name varchar(200) not null,
    option_name varchar(100) not null,
    unit_price numeric(12, 0) not null check (unit_price >= 0),
    quantity integer not null check (quantity > 0)
);

create table reviews (
    id bigserial primary key,
    member_id bigint not null references members(id),
    product_id bigint not null references products(id),
    order_item_id bigint not null unique references order_items(id),
    rating integer not null check (rating between 1 and 5),
    content text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

