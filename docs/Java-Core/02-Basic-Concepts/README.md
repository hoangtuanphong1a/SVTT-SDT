# Các khái niệm cơ bản

## Mục tiêu học tập

- Hiểu về Object và Class
- Nắm vững Method và Variable
- Áp dụng Access Modifier
- Sử dụng Comments đúng cách

## 1. Object và Class

### Class là gì?

Class là bản thiết kế (blueprint) để tạo ra objects. Class định nghĩa:

- Thuộc tính (attributes/fields)
- Hành vi (methods)

### Object là gì?

Object là instance (thể hiện) của class.

```java
// Class definition
public class Student {
    // Attributes
    String name;
    int age;

    // Method
    void study() {
        System.out.println(name + " đang học");
    }
}

// Tạo object
public class Main {
    public static void main(String[] args) {
        Student student1 = new Student(); // Tạo object
        student1.name = "An";
        student1.age = 20;
        student1.study(); // Gọi method
    }
}
```

## 2. Method

Method là khối code thực hiện một nhiệm vụ cụ thể.

### Cú pháp:

```java
accessModifier returnType methodName(parameters) {
    // method body
    return value; // nếu có return type
}
```

### Ví dụ:

```java
public class Calculator {
    // Method không trả về
    public void printMessage() {
        System.out.println("Hello");
    }

    // Method có trả về
    public int add(int a, int b) {
        return a + b;
    }

    // Method với multiple parameters
    public double calculateAverage(int a, int b, int c) {
        return (a + b + c) / 3.0;
    }
}
```

## 3. Variable (Biến)

### Các loại variable:

```java
public class VariableExample {
    // 1. Instance variable (biến instance)
    String instanceVar = "Instance";

    // 2. Static variable (biến static)
    static String staticVar = "Static";

    public void method() {
        // 3. Local variable (biến cục bộ)
        String localVar = "Local";
    }
}
```

### Đặt tên variable:

- Bắt đầu bằng chữ cái, $, hoặc \_
- CamelCase: `studentName`, `totalScore`
- Không dùng keyword của Java

## 4. Access Modifier

Access modifier kiểm soát quyền truy cập vào class, method, variable.

| Modifier  | Class | Package | Subclass | World |
| --------- | ----- | ------- | -------- | ----- |
| public    | ✓     | ✓       | ✓        | ✓     |
| protected | ✓     | ✓       | ✓        | ✗     |
| default   | ✓     | ✓       | ✗        | ✗     |
| private   | ✓     | ✗       | ✗        | ✗     |

### Ví dụ:

```java
public class Person {
    public String name;        // Truy cập mọi nơi
    protected int age;         // Truy cập trong package và subclass
    String address;            // Default: trong package
    private String password;   // Chỉ trong class

    public void setPassword(String pwd) {
        this.password = pwd;   // OK
    }
}

public class Main {
    public static void main(String[] args) {
        Person p = new Person();
        p.name = "An";         // OK
        p.age = 20;            // OK (cùng package)
        p.address = "HN";      // OK (cùng package)
        // p.password = "123"; // ERROR: private
        p.setPassword("123");  // OK: dùng public method
    }
}
```

## 5. Comments

### Single-line comment:

```java
// Đây là comment 1 dòng
int age = 20; // Comment cuối dòng
```

### Multi-line comment:

```java
/*
 * Đây là comment
 * nhiều dòng
 */
int calculateSum(int a, int b) {
    return a + b;
}
```

### JavaDoc comment:

```java
/**
 * Tính tổng 2 số
 * @param a số thứ nhất
 * @param b số thứ hai
 * @return tổng của a và b
 */
public int add(int a, int b) {
    return a + b;
}
```

## 6. Cú pháp Java cơ bản

### Statement:

```java
int x = 10;              // Declaration + Assignment
System.out.println(x);   // Method call
x = x + 5;              // Expression
```

### Block:

```java
{
    int x = 10;
    System.out.println(x);
} // x không tồn tại ngoài block
```

### Whitespace:

```java
// Tất cả đều hợp lệ
int x=10;
int x = 10;
int   x   =   10;
```

## Bài tập

### Bài 1: Tạo Class Person

```java
public class Person {
    // Thuộc tính
    private String name;
    private int age;
    private String email;

    // Methods
    public void introduce() {
        // In ra thông tin
    }

    public void celebrateBirthday() {
        // Tăng tuổi lên 1
    }
}
```

### Bài 2: Calculator Class

Tạo class Calculator với các method:

- `add(int a, int b)`: Cộng
- `subtract(int a, int b)`: Trừ
- `multiply(int a, int b)`: Nhân
- `divide(int a, int b)`: Chia

### Bài 3: Access Modifier

Tạo class BankAccount với:

- private balance
- public method: deposit(), withdraw(), getBalance()
- Giải thích tại sao dùng private cho balance

### Bài 4: Comments Practice

Viết JavaDoc comments cho Calculator class

## Câu hỏi ôn tập

1. Sự khác biệt giữa Class và Object?
2. Method là gì? Thành phần của method?
3. Các loại variable trong Java?
4. Khi nào dùng public, private, protected?
5. Tại sao nên dùng comments?
6. JavaDoc comment khác gì single-line comment?
