# تحليل الـ Backend - مشروع ساتر
## ما الناقص وما يحتاج تعديل

---

## ✅ الموجود حالياً (من Postman Collection)

| الـ Endpoint | الطريقة | الوصف |
|---|---|---|
| `/api/register` | POST | تسجيل عميل جديد |
| `/api/login` | POST | تسجيل الدخول |
| `/api/verify-otp` | POST | التحقق من رمز OTP |
| `/api/profile` | GET | بيانات البروفايل |
| `/api/addresses` | GET | قائمة العناوين |
| `/api/addresses` | POST | إضافة عنوان |
| `/api/v1/products` | GET | قائمة المنتجات |
| `/api/v1/search/products?q=` | GET | البحث في المنتجات |
| `/api/v1/categories` | GET | قائمة الفئات |
| `/api/cart` | GET | عرض السلة |
| `/api/cart/add` | POST | إضافة للسلة |
| `/api/wishlist` | GET | قائمة الأمنيات |
| `/api/checkout` | POST | إتمام الطلب |
| `/api/v1/orders` | GET | طلبات العميل |
| `/api/vendor/orders` | GET | طلبات البائع |
| `/api/vendors/register` | POST | تسجيل بائع |

---

## ❌ الناقص - لازم تضيفه

### 1. منتجات - مهم جداً
```
GET  /api/v1/products/{id}          ← تفاصيل منتج واحد (صفحة المنتج ما تشتغل بدونه)
GET  /api/v1/products/{slug}        ← بالـ slug اختياري
GET  /api/v1/products?featured=1   ← للمنتجات المميزة في الهوم
GET  /api/v1/products?sort=popular ← للأكثر مبيعاً
```

### 2. السلة - ناقص CRUD كامل
```
PUT    /api/cart/{item_id}          ← تعديل الكمية
DELETE /api/cart/{item_id}          ← حذف منتج من السلة
DELETE /api/cart                    ← تفريغ السلة كاملاً
```

### 3. الـ Wishlist - ناقصة endpoints للتعديل
```
POST   /api/wishlist/toggle         ← إضافة/حذف من المفضلة
DELETE /api/wishlist/{product_id}   ← حذف من المفضلة
```
> الموجود بس GET - لا يمكن الإضافة أو الحذف

### 4. الطلبات - ناقص تفاصيل الطلب الواحد
```
GET /api/v1/orders/{id}             ← تفاصيل طلب محدد
```

### 5. المراجعات والتقييمات - مش موجودة أصلاً
```
GET  /api/v1/products/{id}/reviews
POST /api/v1/products/{id}/reviews
```
> في التصميم فيه قسم للتقييمات (آراء العملاء + نجوم) - ما فيه API يدعمه

### 6. بيانات المنتج - ناقصة حقول
المنتج من الـ API لازم يرجع:
```json
{
  "id": 1,
  "name": "عباية كلاسيك سيلك",
  "slug": "abaya-classic-silk",
  "price": 450,
  "old_price": 580,           ← للـ discount badge
  "images": ["url1", "url2"], ← متعددة مش صورة واحدة
  "colors": ["#000", "#333"], ← للـ color picker
  "sizes": ["S", "M", "L"],   ← للـ size selector
  "description": "...",
  "is_new": true,             ← للـ "جديد" badge
  "rating": 4.8,              ← التقييم
  "reviews_count": 124,
  "vendor": {
    "id": 1,
    "name": "...",
    "shop_name": "..."
  },
  "category": {
    "id": 1,
    "name": "..."
  }
}
```

### 7. الفئات - لازم تكون فيها صور وعدد المنتجات
```json
{
  "id": 1,
  "name": "العبايات",
  "slug": "abayas",
  "image": "url",              ← مش موجود في الغالب
  "products_count": 1200       ← لعرضه تحت كل فئة
}
```

### 8. السلة للـ Guests - مش واضح
- في الـ checkout بتبعت `cart_key: null`
- لازم يكون في آلية لربط سلة الـ guest بالعميل بعد الـ login
- لازم السلة تقبل `cart_key` في كل الـ endpoints مش بس الـ checkout

---

## ⚠️ تعديلات على الموجود

### 1. Response format متوحّد
حالياً مش واضح هل الـ response هيكون:
```json
{ "data": [...] }           ← Laravel API Resource
// أو
[...]                        ← مصفوفة مباشرة
```
**لازم:** كل الـ endpoints تستخدم نفس الـ format مع pagination متعمدة:
```json
{
  "data": [...],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 12,
    "total": 58
  }
}
```

### 2. Cart Response - ناقص حقول
الـ Cart لازم يرجع:
```json
{
  "items": [...],
  "cart_key": "abc123",    ← للـ guest
  "subtotal": 7497,
  "shipping": 0,
  "tax": 1124.55,
  "total": 8621.55
}
```

### 3. Login Response - لازم يوضح إذا في OTP
```json
{
  "token": "...",
  "requires_otp": false,   ← الـ frontend يحتاج يعرف
  "user": { ... }
}
```

### 4. Checkout Response - لازم يرجع الـ Order
```json
{
  "order": {
    "id": 123,
    "status": "pending",
    "total": 8621.55
  },
  "message": "تم تأكيد طلبك بنجاح"
}
```

### 5. Error Responses - لازم تكون موحدة
```json
{
  "message": "رسالة الخطأ بالعربي",
  "errors": {
    "email": ["هذا البريد مستخدم مسبقاً"]
  }
}
```

---

## 🔧 اقتراحات إضافية لتجربة أفضل

### 1. Pagination للمنتجات
```
GET /api/v1/products?page=1&per_page=12&category_id=1&sort=price_asc
```

### 2. Profile Update
```
PUT /api/profile              ← تعديل بيانات المستخدم
PUT /api/addresses/{id}       ← تعديل عنوان
DELETE /api/addresses/{id}    ← حذف عنوان
```

### 3. Vendor Profile (للتصميم اللي فيه "زيارة المتجر")
```
GET /api/v1/vendors/{id}
GET /api/v1/vendors/{id}/products
```

### 4. CORS Settings
تأكد إن Laravel مضبوط يقبل requests من:
```
http://localhost:3000   (Nuxt Dev)
https://yourdomain.com (Production)
```

في `config/cors.php`:
```php
'allowed_origins' => ['http://localhost:3000'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
```

---

## 📋 ملخص الأولويات

| الأولوية | الـ Endpoint | السبب |
|---|---|---|
| 🔴 عاجل | `GET /api/v1/products/{id}` | صفحة المنتج ما تشتغل |
| 🔴 عاجل | `PUT/DELETE /api/cart/{id}` | السلة ما تكتمل |
| 🔴 عاجل | `POST /api/wishlist/toggle` | زر القلب ما يشتغل |
| 🟡 مهم | Reviews endpoints | قسم التقييمات في التصميم |
| 🟡 مهم | حقل `images` متعدد للمنتج | carousel الصور في التصميم |
| 🟡 مهم | حقول `colors`, `sizes` | الـ UI موجود بس ما فيه data |
| 🟢 اختياري | `GET /api/v1/orders/{id}` | صفحة تفاصيل الطلب |
| 🟢 اختياري | `GET /api/v1/vendors/{id}` | صفحة البائع |
