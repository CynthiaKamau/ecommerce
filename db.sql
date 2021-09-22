CREATE SEQUENCE roles_id_seq;
CREATE TABLE "public"."roles" (
  "id" int8 NOT NULL DEFAULT nextval('roles_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "status" bool NOT NULL DEFAULT true,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id")
);

ALTER TABLE "public"."roles" 
  OWNER TO "postgres";

CREATE SEQUENCE payment_methods_id_seq;
CREATE TABLE "public"."payment_methods" (
  "id" int8 NOT NULL DEFAULT nextval('payment_methods_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "status" bool NOT NULL DEFAULT true,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id")
);

ALTER TABLE "public"."payment_methods" 
  OWNER TO "postgres";
  
CREATE SEQUENCE product_category_id_seq;
CREATE TABLE "public"."product_category" (
  "id" int8 NOT NULL DEFAULT nextval('product_category_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "status" bool NOT NULL DEFAULT true,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id")
);

ALTER TABLE "public"."product_category" 
  OWNER TO "postgres";
  
CREATE SEQUENCE product_stock_id_seq;
CREATE TABLE "public"."product_stock" (
  "id" int8 NOT NULL DEFAULT nextval('product_stock_id_seq'::regclass),
  "quantity" int8 NOT NULL,
  "status" bool NOT NULL DEFAULT true,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id")
);

ALTER TABLE "public"."product_stock" 
  OWNER TO "postgres";

CREATE SEQUENCE discount_id_seq;
CREATE TABLE "public"."discount" (
  "id" int8 NOT NULL DEFAULT nextval('discount_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "percentage" float(8) NOT NULL,
  "status" bool NOT NULL DEFAULT true,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id")
);

ALTER TABLE "public"."discount" 
  OWNER TO "postgres";

CREATE SEQUENCE products_id_seq;
CREATE TABLE "public"."products" (
  "id" int8 NOT NULL DEFAULT nextval('products_id_seq'::regclass),
  "SKU" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "unit_price" int8 NOT NULL,
  "discount_id" int8,
  "size" varchar(255) COLLATE "pg_catalog"."default",
  "color" varchar(255) COLLATE "pg_catalog"."default",
  "weight" varchar(255) COLLATE "pg_catalog"."default",
  "category_id" int8 NOT NULL,
  "stock_id" int8 NOT NULL,
  "status" bool NOT NULL DEFAULT true,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("discount_id") REFERENCES "public"."discount" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("stock_id") REFERENCES "public"."product_stock" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("category_id") REFERENCES "public"."product_category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  UNIQUE("SKU"),
  UNIQUE("name")

);
ALTER TABLE "public"."products" 
  OWNER TO "postgres";

CREATE SEQUENCE product_rating_id_seq;
CREATE TABLE "public"."product_rating" (
  "id" int8 NOT NULL DEFAULT nextval('product_rating_id_seq'::regclass),
  "product_id" int8 NOT NULL,
  "rating" int8 NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION

);

ALTER TABLE "public"."product_rating" 
  OWNER TO "postgres";

CREATE SEQUENCE users_id_seq;
CREATE TABLE "public"."users" (
  "id" int8 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  "first_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "middle_name" varchar(255) COLLATE "pg_catalog"."default",
  "last_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "phone_number" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "role_id" int8 NOT NULL,
  "status" bool NOT NULL DEFAULT true,
  "email_verified_at" timestamp(0),
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "remember_token" varchar(100) COLLATE "pg_catalog"."default",
  "created_by" int8,
  "updated_by" int8,
  "deleted_by" int8,
  "restored_by" int8,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "deleted_at" timestamp(0),
  "restored_at" timestamp(0),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("role_id") REFERENCES "public"."roles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("updated_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("deleted_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("restored_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  UNIQUE ("email"),
  UNIQUE ("phone_number")
);

ALTER TABLE "public"."users" 
  OWNER TO "postgres";

CREATE SEQUENCE user_payment_id_seq;
CREATE TABLE "public"."user_payment" (
  "id" int8 NOT NULL DEFAULT nextval('user_payment_id_seq'::regclass),
  "user_id" int8 NOT NULL,
  "payment_id" int8 NOT NULL,
  "provider" varchar(255) COLLATE "pg_catalog"."default" ,
  "account_no" varchar(255) COLLATE "pg_catalog"."default",
  "status" bool NOT NULL DEFAULT true,
  "expiry" timestamp(0),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("payment_id") REFERENCES "public"."payment_methods" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION

);

ALTER TABLE "public"."user_payment" 
  OWNER TO "postgres";

CREATE SEQUENCE user_address_id_seq;
CREATE TABLE "public"."user_address" (
  "id" int8 NOT NULL DEFAULT nextval('user_address_id_seq'::regclass),
  "user_id" int8 NOT NULL,
  "latitude" int8 NOT NULL,
  "longitude" int8 NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" ,
  "status" bool NOT NULL DEFAULT true,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION

);

ALTER TABLE "public"."user_address" 
  OWNER TO "postgres";

CREATE SEQUENCE shopping_session_id_seq;
CREATE TABLE "public"."shopping_session" (
  "id" int8 NOT NULL DEFAULT nextval('shopping_session_id_seq'::regclass),
  "user_id" int8 NOT NULL,
  "total" int8,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION

);

ALTER TABLE "public"."shopping_session" 
  OWNER TO "postgres";

CREATE SEQUENCE cart_item_id_seq;
CREATE TABLE "public"."cart_item" (
  "id" int8 NOT NULL DEFAULT nextval('cart_item_id_seq'::regclass),
  "session_id" int8 NOT NULL,
  "product_id" int8 NOT NULL,
  "quantity" int8,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("session_id") REFERENCES "public"."shopping_session" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION

);

ALTER TABLE "public"."cart_item" 
  OWNER TO "postgres";

CREATE SEQUENCE orders_id_seq;
CREATE TABLE "public"."orders" (
  "id" int8 NOT NULL DEFAULT nextval('orders_id_seq'::regclass),
  "user_id" int8 NOT NULL,
  "payment_id" int8 ,
  "total" int8 NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("payment_id") REFERENCES "public"."payment_methods" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION

);

ALTER TABLE "public"."orders" 
  OWNER TO "postgres";

CREATE SEQUENCE payment_details_id_seq;
CREATE TABLE "public"."payment_details" (
  "id" int8 NOT NULL DEFAULT nextval('payment_details_id_seq'::regclass),
  "order_id" int8 NOT NULL,
  "amount" int8 NOT NULL,
  "provider" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "status" bool NOT NULL DEFAULT true,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("order_id") REFERENCES "public"."orders" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION

);

ALTER TABLE "public"."payment_details" 
  OWNER TO "postgres";

CREATE SEQUENCE order_items_id_seq;
CREATE TABLE "public"."order_items" (
  "id" int8 NOT NULL DEFAULT nextval('order_items_id_seq'::regclass),
  "product_id" int8 NOT NULL,
  "order_id" int8 NOT NULL,
  "quantity" int8 NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("order_id") REFERENCES "public"."orders" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION

);

ALTER TABLE "public"."order_items" 
  OWNER TO "postgres";

CREATE SEQUENCE suppliers_id_seq;
CREATE TABLE "public"."suppliers" (
  "id" int8 NOT NULL DEFAULT nextval('suppliers_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "contact_person" varchar(255) COLLATE "pg_catalog"."default",
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "phone_number" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "address" varchar(255) COLLATE "pg_catalog"."default",
  "status" bool NOT NULL DEFAULT true,
  "created_by" int8,
  "updated_by" int8,
  "deleted_by" int8,
  "restored_by" int8,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "deleted_at" timestamp(0),
  "restored_at" timestamp(0),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("updated_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("deleted_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("restored_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  UNIQUE ("email"),
  UNIQUE ("phone_number")
);


