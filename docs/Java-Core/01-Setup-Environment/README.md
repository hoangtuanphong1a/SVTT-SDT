# Cài đặt môi trường và Chương trình đầu tiên

## Mục tiêu học tập

- Cài đặt JDK (Java Development Kit)
- Viết chương trình Java đầu tiên bằng Notepad
- Compile và run chương trình bằng CMD
- Hiểu cấu trúc cơ bản của chương trình Java

## 1. Cài đặt JDK

### Bước 1: Download JDK

- Truy cập: https://www.oracle.com/java/technologies/downloads/
- Chọn phiên bản JDK mới nhất (Java 17 LTS hoặc Java 21 LTS)
- Download bản cài đặt phù hợp với hệ điều hành

### Bước 2: Cài đặt JDK

- Chạy file cài đặt đã download
- Follow hướng dẫn cài đặt
- Ghi nhớ đường dẫn cài đặt (thường là: C:\Program Files\Java\jdk-xx)

### Bước 3: Thiết lập biến môi trường

1. Mở System Properties → Environment Variables
2. Tạo biến JAVA_HOME:
   - Variable name: `JAVA_HOME`
   - Variable value: `C:\Program Files\Java\jdk-xx`
3. Thêm vào PATH:
   - Tìm biến PATH trong System variables
   - Thêm: `%JAVA_HOME%\bin`

### Bước 4: Kiểm tra cài đặt

Mở CMD và gõ:

```cmd
java -version
javac -version
```

## 2. Chương trình Java đầu tiên

### Viết code bằng Notepad

Mở Notepad và gõ:

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Chào mừng đến với Java Programming!");
    }
}
```

Lưu file với tên: **HelloWorld.java**

- Chọn File → Save As
- File name: `HelloWorld.java`
- Save as type: All Files (\*)
- Lưu vào thư mục: D:\JavaProjects\

## 3. Compile và Run bằng CMD

### Compile chương trình

Mở CMD, di chuyển đến thư mục chứa file:

```cmd
cd D:\JavaProjects
javac HelloWorld.java
```

Sau khi compile thành công, sẽ tạo ra file **HelloWorld.class**

### Run chương trình

```cmd
java HelloWorld
```

Kết quả:

```
Hello, World!
Chào mừng đến với Java Programming!
```

## 4. Cấu trúc chương trình Java

```java
public class HelloWorld {              // 1. Class declaration
    public static void main(String[] args) {  // 2. Main method
        System.out.println("Hello, World!");   // 3. Statement
    }
}
```

### Giải thích:

1. **Class declaration**: Mọi chương trình Java phải có ít nhất 1 class
2. **Main method**: Điểm bắt đầu của chương trình
   - `public`: access modifier
   - `static`: có thể gọi mà không cần tạo object
   - `void`: không trả về giá trị
   - `main`: tên method
   - `String[] args`: tham số dòng lệnh
3. **Statement**: Câu lệnh thực thi

## 5. Lưu ý quan trọng

- Tên file Java phải trùng với tên class public (case-sensitive)
- Java phân biệt chữ hoa/thường
- Mỗi statement kết thúc bằng dấu `;`
- Block code được bao bởi `{ }`

## Bài tập

### Bài 1: Personal Info

Viết chương trình in ra thông tin cá nhân:

```
Họ tên: Nguyễn Văn A
Tuổi: 20
Trường: Đại học ABC
```

### Bài 2: Simple Calculator

Viết chương trình tính tổng 2 số:

```java
public class Calculator {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        int sum = a + b;
        System.out.println("Tổng = " + sum);
    }
}
```

### Bài 3: Multiple Lines

Viết chương trình in ra bảng cửu chương 2:

```
2 x 1 = 2
2 x 2 = 4
...
2 x 10 = 20
```

## Câu hỏi ôn tập

1. JDK là gì? JRE là gì? JVM là gì?
2. Tại sao phải thiết lập biến môi trường JAVA_HOME?
3. Sự khác biệt giữa `javac` và `java`?
4. Tại sao tên file phải trùng với tên class?
5. Main method có vai trò gì?
