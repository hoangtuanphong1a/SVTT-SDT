# Vòng lặp và Wrapper Classes

## Mục tiêu học tập

- Nắm vững các loại vòng lặp
- Sử dụng break và continue
- Hiểu về Wrapper Classes
- Làm việc với Integer, Double và các wrapper khác

## 1. For Loop

### Cú pháp cơ bản:

```java
for (initialization; condition; update) {
    // statements
}
```

### Ví dụ:

```java
public class ForLoopExample {
    public static void main(String[] args) {
        // In số từ 1 đến 10
        for (int i = 1; i <= 10; i++) {
            System.out.println(i);
        }

        // In số chẵn từ 0 đến 20
        for (int i = 0; i <= 20; i += 2) {
            System.out.println(i);
        }

        // Đếm ngược
        for (int i = 10; i >= 1; i--) {
            System.out.println(i);
        }

        // Nested for loop
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
```

## 2. While Loop

### Cú pháp:

```java
while (condition) {
    // statements
}
```

### Ví dụ:

```java
public class WhileLoopExample {
    public static void main(String[] args) {
        // Đếm từ 1 đến 10
        int i = 1;
        while (i <= 10) {
            System.out.println(i);
            i++;
        }

        // Tính tổng các số từ 1 đến 100
        int sum = 0;
        int n = 1;
        while (n <= 100) {
            sum += n;
            n++;
        }
        System.out.println("Sum = " + sum);

        // Menu với while
        Scanner scanner = new Scanner(System.in);
        String choice = "";
        while (!choice.equals("exit")) {
            System.out.println("Enter command (exit to quit):");
            choice = scanner.nextLine();
            System.out.println("You entered: " + choice);
        }
    }
}
```

## 3. Do-While Loop

### Cú pháp:

```java
do {
    // statements
} while (condition);
```

### Ví dụ:

```java
public class DoWhileExample {
    public static void main(String[] args) {
        // Chạy ít nhất 1 lần
        int i = 1;
        do {
            System.out.println(i);
            i++;
        } while (i <= 10);

        // Validate input
        Scanner scanner = new Scanner(System.in);
        int number;
        do {
            System.out.print("Enter a positive number: ");
            number = scanner.nextInt();
        } while (number <= 0);

        System.out.println("Valid number: " + number);
    }
}
```

## 4. Enhanced For Loop (For-Each)

### Cú pháp:

```java
for (Type variable : collection) {
    // statements
}
```

### Ví dụ:

```java
public class ForEachExample {
    public static void main(String[] args) {
        // Array
        int[] numbers = {1, 2, 3, 4, 5};
        for (int num : numbers) {
            System.out.println(num);
        }

        // String array
        String[] names = {"An", "Bình", "Chi"};
        for (String name : names) {
            System.out.println("Hello, " + name);
        }

        // ArrayList
        ArrayList<Integer> list = new ArrayList<>();
        list.add(10);
        list.add(20);
        list.add(30);
        for (int value : list) {
            System.out.println(value);
        }
    }
}
```

## 5. Break và Continue

```java
public class BreakContinueExample {
    public static void main(String[] args) {
        // Break: thoát khỏi loop
        for (int i = 1; i <= 10; i++) {
            if (i == 5) {
                break; // Dừng loop khi i = 5
            }
            System.out.println(i);
        } // In: 1 2 3 4

        // Continue: bỏ qua iteration hiện tại
        for (int i = 1; i <= 10; i++) {
            if (i % 2 == 0) {
                continue; // Bỏ qua số chẵn
            }
            System.out.println(i);
        } // In: 1 3 5 7 9

        // Labeled break
        outer:
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                if (i == 2 && j == 2) {
                    break outer; // Thoát cả 2 loops
                }
                System.out.println(i + "," + j);
            }
        }
    }
}
```

## 6. Wrapper Classes

Wrapper classes chuyển đổi primitive types thành objects.

| Primitive | Wrapper Class |
| --------- | ------------- |
| byte      | Byte          |
| short     | Short         |
| int       | Integer       |
| long      | Long          |
| float     | Float         |
| double    | Double        |
| char      | Character     |
| boolean   | Boolean       |

## 7. Integer Class

```java
public class IntegerExample {
    public static void main(String[] args) {
        // Tạo Integer object
        Integer num1 = new Integer(10); // Deprecated
        Integer num2 = Integer.valueOf(20); // Recommended
        Integer num3 = 30; // Autoboxing

        // Convert to primitive
        int primitiveNum = num2.intValue(); // Unboxing
        int autoUnbox = num3; // Auto-unboxing

        // Parse string to int
        int parsed = Integer.parseInt("123");
        System.out.println(parsed); // 123

        // Convert int to string
        String str = Integer.toString(456);
        System.out.println(str); // "456"

        // Constants
        System.out.println(Integer.MIN_VALUE); // -2147483648
        System.out.println(Integer.MAX_VALUE); // 2147483647
        System.out.println(Integer.SIZE); // 32 bits

        // Utility methods
        System.out.println(Integer.max(10, 20)); // 20
        System.out.println(Integer.min(10, 20)); // 10
        System.out.println(Integer.sum(10, 20)); // 30
        System.out.println(Integer.compare(10, 20)); // -1

        // Convert to binary, octal, hex
        System.out.println(Integer.toBinaryString(10)); // "1010"
        System.out.println(Integer.toOctalString(10)); // "12"
        System.out.println(Integer.toHexString(255)); // "ff"
    }
}
```

## 8. Double Class

```java
public class DoubleExample {
    public static void main(String[] args) {
        // Tạo Double object
        Double d1 = Double.valueOf(3.14);
        Double d2 = 2.71; // Autoboxing

        // Convert to primitive
        double primitiveDouble = d1.doubleValue();

        // Parse string to double
        double parsed = Double.parseDouble("3.14159");
        System.out.println(parsed);

        // Convert to string
        String str = Double.toString(3.14);

        // Constants
        System.out.println(Double.MIN_VALUE); // Smallest positive value
        System.out.println(Double.MAX_VALUE); // Largest value
        System.out.println(Double.POSITIVE_INFINITY);
        System.out.println(Double.NEGATIVE_INFINITY);
        System.out.println(Double.NaN); // Not a Number

        // Utility methods
        System.out.println(Double.max(3.14, 2.71));
        System.out.println(Double.min(3.14, 2.71));
        System.out.println(Double.sum(3.14, 2.71));
        System.out.println(Double.isNaN(Double.NaN)); // true
        System.out.println(Double.isInfinite(1.0 / 0.0)); // true
    }
}
```

## 9. Autoboxing và Unboxing

```java
public class AutoboxingExample {
    public static void main(String[] args) {
        // Autoboxing: primitive -> wrapper
        Integer num = 10; // tự động: Integer.valueOf(10)

        // Unboxing: wrapper -> primitive
        int primitiveNum = num; // tự động: num.intValue()

        // In collections
        ArrayList<Integer> list = new ArrayList<>();
        list.add(5); // Autoboxing
        int value = list.get(0); // Unboxing

        // In operations
        Integer a = 10;
        Integer b = 20;
        Integer sum = a + b; // Unbox -> add -> autobox
    }
}
```

## Bài tập

### Bài 1: Patterns

In ra các patterns:

```
*
**
***
****
*****
```

```
1
12
123
1234
12345
```

### Bài 2: Prime Number Checker

```java
public boolean isPrime(int n) {
    // Kiểm tra n có phải số nguyên tố không
}
```

### Bài 3: Factorial

```java
public int factorial(int n) {
    // Tính n! = 1 * 2 * 3 * ... * n
}
```

### Bài 4: Fibonacci

```java
// In ra n số Fibonacci đầu tiên
// 0, 1, 1, 2, 3, 5, 8, 13, 21, ...
```

### Bài 5: Number Guessing Game

```java
// Máy chọn số ngẫu nhiên từ 1-100
// Người chơi đoán, máy báo cao/thấp
// Dùng do-while để chơi lại
```

### Bài 6: Integer Utilities

```java
// Tạo class với methods:
// - convertToBinary(int n)
// - convertToHex(int n)
// - findMax(int[] arr)
// - findMin(int[] arr)
```

## Câu hỏi ôn tập

1. Khi nào dùng for, while, do-while?
2. For-each loop có ưu/nhược điểm gì?
3. Break và continue khác nhau như thế nào?
4. Wrapper class có tác dụng gì?
5. Autoboxing và unboxing là gì?
6. Tại sao dùng `Integer.valueOf()` thay vì `new Integer()`?
7. Integer.parseInt() và Integer.valueOf() khác nhau như thế nào?
