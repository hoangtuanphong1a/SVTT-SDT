# OOP Fundamentals - Object, Class, Constructor

## Mục tiêu học tập

- Hiểu sâu về Object và Class
- Sử dụng Constructor
- Phân biệt các loại Variable
- Nắm vững kiểu dữ liệu nguyên thủy và tham chiếu
- Sử dụng Escape Sequences

## 1. Object và Class Chi tiết

### Class Components:

```java
public class Car {
    // 1. Fields (Attributes)
    private String brand;
    private String model;
    private int year;
    private double price;

    // 2. Constructor
    public Car(String brand, String model, int year, double price) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.price = price;
    }

    // 3. Methods (Behaviors)
    public void start() {
        System.out.println(brand + " " + model + " đang khởi động...");
    }

    public void displayInfo() {
        System.out.println("Brand: " + brand);
        System.out.println("Model: " + model);
        System.out.println("Year: " + year);
        System.out.println("Price: $" + price);
    }

    // 4. Getters and Setters
    public String getBrand() {
        return brand;
    }

    public void setPrice(double price) {
        if (price > 0) {
            this.price = price;
        }
    }
}
```

## 2. Constructor

Constructor là method đặc biệt để khởi tạo object.

### Đặc điểm:

- Tên trùng với tên class
- Không có return type
- Tự động được gọi khi tạo object

### Các loại Constructor:

```java
public class Student {
    private String name;
    private int age;
    private String major;

    // 1. No-argument Constructor (Default)
    public Student() {
        this.name = "Unknown";
        this.age = 18;
        this.major = "Undeclared";
    }

    // 2. Parameterized Constructor
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
        this.major = "Undeclared";
    }

    // 3. Constructor with all parameters
    public Student(String name, int age, String major) {
        this.name = name;
        this.age = age;
        this.major = major;
    }

    // 4. Constructor chaining
    public Student(String name) {
        this(name, 18, "Undeclared"); // Gọi constructor khác
    }
}

// Sử dụng:
public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();
        Student s2 = new Student("An", 20);
        Student s3 = new Student("Bình", 21, "IT");
        Student s4 = new Student("Chi");
    }
}
```

## 3. Variable Types

### Instance Variable:

```java
public class Employee {
    private String name;    // Instance variable
    private int salary;     // Instance variable

    // Mỗi object có bản sao riêng của instance variable
}
```

### Static Variable:

```java
public class Employee {
    private String name;
    private static int count = 0; // Static variable (class variable)

    public Employee(String name) {
        this.name = name;
        count++; // Shared by all objects
    }

    public static int getCount() {
        return count;
    }
}

// Sử dụng:
Employee e1 = new Employee("An");
Employee e2 = new Employee("Bình");
System.out.println(Employee.getCount()); // 2
```

### Local Variable:

```java
public class Calculator {
    public int add(int a, int b) {
        int result = a + b; // Local variable
        return result;
    } // result không tồn tại ngoài method
}
```

## 4. Kiểu Dữ Liệu

### Primitive Types (Nguyên thủy):

| Type    | Size    | Range             | Default  |
| ------- | ------- | ----------------- | -------- |
| byte    | 1 byte  | -128 to 127       | 0        |
| short   | 2 bytes | -32,768 to 32,767 | 0        |
| int     | 4 bytes | -2³¹ to 2³¹-1     | 0        |
| long    | 8 bytes | -2⁶³ to 2⁶³-1     | 0L       |
| float   | 4 bytes | ~6-7 digits       | 0.0f     |
| double  | 8 bytes | ~15 digits        | 0.0d     |
| char    | 2 bytes | 0 to 65,535       | '\u0000' |
| boolean | 1 bit   | true/false        | false    |

```java
// Ví dụ:
byte age = 25;
short year = 2024;
int population = 1000000;
long distance = 9876543210L;
float price = 19.99f;
double pi = 3.14159265359;
char grade = 'A';
boolean isActive = true;
```

### Reference Types (Tham chiếu):

```java
// String
String name = "Nguyễn Văn An";
String empty = null; // Reference có thể null

// Array
int[] numbers = {1, 2, 3, 4, 5};
String[] names = new String[10];

// Object
Student student = new Student("An", 20);
Car car = null; // Chưa trỏ đến object nào
```

### So sánh:

```java
// Primitive: lưu giá trị trực tiếp
int a = 10;
int b = a; // Copy giá trị
b = 20;
System.out.println(a); // 10 (không đổi)

// Reference: lưu địa chỉ
Student s1 = new Student("An", 20);
Student s2 = s1; // Copy reference
s2.setAge(21);
System.out.println(s1.getAge()); // 21 (đã đổi)
```

## 5. Escape Sequences

Escape sequences bắt đầu bằng backslash `\`:

```java
public class EscapeExample {
    public static void main(String[] args) {
        // \n - New line
        System.out.println("Line 1\nLine 2");

        // \t - Tab
        System.out.println("Name:\tJohn");

        // \" - Double quote
        System.out.println("He said \"Hello\"");

        // \' - Single quote
        System.out.println('\'');

        // \\ - Backslash
        System.out.println("Path: C:\\Users\\Documents");

        // \r - Carriage return
        System.out.println("Hello\rWorld");

        // \b - Backspace
        System.out.println("Hello\bWorld");
    }
}
```

### Kết quả:

```
Line 1
Line 2
Name:	John
He said "Hello"
'
Path: C:\Users\Documents
World
HellWorld
```

## Bài tập

### Bài 1: Book Class

Tạo class Book với:

- Thuộc tính: title, author, price, pages
- Constructor: no-arg, với title, với all parameters
- Methods: displayInfo(), applyDiscount(double percent)
- Getters/Setters

### Bài 2: BankAccount

```java
public class BankAccount {
    private String accountNumber;
    private String owner;
    private double balance;
    private static int totalAccounts = 0;

    // Constructors
    // Methods: deposit(), withdraw(), getBalance()
    // Static method: getTotalAccounts()
}
```

### Bài 3: Primitive vs Reference

Viết chương trình minh họa sự khác biệt:

```java
// So sánh copy primitive và reference
```

### Bài 4: Formatted Output

Sử dụng escape sequences để in ra:

```
Student Information:
--------------------
Name:		Nguyễn Văn An
Age:		20
Major:		"Computer Science"
Path:		C:\Users\Student\Documents
```

## Câu hỏi ôn tập

1. Constructor khác method thường như thế nào?
2. Constructor overloading là gì?
3. Sự khác biệt giữa instance variable và static variable?
4. Tại sao reference type có thể null nhưng primitive không?
5. Khi nào nên dùng int, khi nào dùng long?
6. Escape sequence `\n` và `\r` khác nhau như thế nào?
7. This keyword dùng để làm gì?
