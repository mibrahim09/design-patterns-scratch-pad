# **Behavioral Patterns**

## Memento Pattern

``
Use this pattern when doing something like Undos and Redo, where you want to store
the current state of something to which you'll have to go back sometime.
``

## State Pattern

``
If your object changes behavior based on its current state, the State Pattern helps organize this behavior into separate state classes.
This removes the need for large if or switch statements, making the code more modular and easier to extend.
``

## Iterator Pattern

``
Use this pattern when you want to loop over an array of items, where you dont want to worry about the actual data structure. You can just implement an Iterator for the DataStructure you want to loop over and expose it as as an Iterator.
``

```
public interface Iterator<T> {
    boolean hasNext();
    T current();
    void next();
}
```

# Strategy Pattern

The Strategy Pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It allows the client to choose an algorithm at runtime, keeping the client code clean and flexible.

## When to Use
Use the Strategy Pattern when you need multiple ways to perform an operation and want to choose the right approach dynamically.

## Example

Below is a simple example where we calculate the price with different discount strategies.

### Code
```java
// Strategy interface
interface DiscountStrategy {
    double applyDiscount(double price);
}

// Concrete strategies
class NoDiscountStrategy implements DiscountStrategy {
    public double applyDiscount(double price) {
        return price;
    }
}

class SeasonalDiscountStrategy implements DiscountStrategy {
    public double applyDiscount(double price) {
        return price * 0.9; // 10% discount
    }
}

class ClearanceDiscountStrategy implements DiscountStrategy {
    public double applyDiscount(double price) {
        return price * 0.5; // 50% discount
    }
}

// Context
class ShoppingCart {
    private DiscountStrategy discountStrategy;

    public ShoppingCart(DiscountStrategy discountStrategy) {
        this.discountStrategy = discountStrategy;
    }

    public double calculateTotal(double price) {
        return discountStrategy.applyDiscount(price);
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart(new SeasonalDiscountStrategy());
        System.out.println("Total with Seasonal Discount: " + cart.calculateTotal(100));

        cart = new ShoppingCart(new ClearanceDiscountStrategy());
        System.out.println("Total with Clearance Discount: " + cart.calculateTotal(100));
    }
}
```



---

### Template Method Pattern

#### When to Use the Template Method Pattern

The **Template Method Pattern** is useful when you have a general workflow or algorithm that remains mostly the same across subclasses, but you need to vary some specific steps. This pattern defines the skeleton of an algorithm, deferring some steps to subclasses, allowing you to enforce a common structure while customizing specific behaviors.

- **Use Template Method Pattern** when:
    - You want to define the overall structure of an algorithm, allowing subclasses to provide specific implementations for certain steps.
    - You have a class with an invariant sequence of steps that can be partially overridden or extended by subclasses.

#### README Example for Template Method Pattern

```markdown
# Template Method Pattern

The Template Method Pattern defines the skeleton of an algorithm in the superclass, allowing subclasses to implement specific steps. This pattern provides flexibility by enabling subclasses to modify parts of an algorithm without changing its structure.

## When to Use
Use the Template Method Pattern when you have an algorithm that follows a standard structure but requires subclass-specific implementations for certain steps.

## Example

Below is an example where we create a workflow for preparing a beverage, with specific steps varying between Tea and Coffee.

### Code
```java
// Abstract class with template method
abstract class Beverage {
    // Template method
    public final void prepareRecipe() {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    }

    // Common steps
    private void boilWater() {
        System.out.println("Boiling water");
    }

    private void pourInCup() {
        System.out.println("Pouring into cup");
    }

    // Steps to be defined by subclasses
    abstract void brew();
    abstract void addCondiments();
}

// Concrete subclasses
class Tea extends Beverage {
    void brew() {
        System.out.println("Steeping the tea");
    }

    void addCondiments() {
        System.out.println("Adding lemon");
    }
}

class Coffee extends Beverage {
    void brew() {
        System.out.println("Dripping coffee through filter");
    }

    void addCondiments() {
        System.out.println("Adding sugar and milk");
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Beverage tea = new Tea();
        tea.prepareRecipe();

        System.out.println();

        Beverage coffee = new Coffee();
        coffee.prepareRecipe();
    }
}
```


# Command Pattern

The Command Pattern encapsulates a request as an object, allowing you to parameterize clients with requests, queue requests, and support undoable operations. This pattern decouples the sender of a command from its receiver, enabling flexibility in executing operations.

## When to Use
Use the Command Pattern when you need to queue, log, or support undoable requests, or when you want to decouple the sender from the receiver.

## Example

In the example below, we create a remote control that can execute various commands like turning lights on and off. Each command is encapsulated in its own class.

### Code
```java
// Command interface
interface Command {
    void execute();
}

// Receiver class
class Light {
    public void turnOn() {
        System.out.println("Light is On");
    }

    public void turnOff() {
        System.out.println("Light is Off");
    }
}

// Concrete Command classes
class LightOnCommand implements Command {
    private Light light;

    public LightOnCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.turnOn();
    }
}

class LightOffCommand implements Command {
    private Light light;

    public LightOffCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.turnOff();
    }
}

// Invoker class
class RemoteControl {
    private Command command;

    public void setCommand(Command command) {
        this.command = command;
    }

    public void pressButton() {
        command.execute();
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Light livingRoomLight = new Light();

        Command lightOn = new LightOnCommand(livingRoomLight);
        Command lightOff = new LightOffCommand(livingRoomLight);

        RemoteControl remote = new RemoteControl();

        remote.setCommand(lightOn);
        remote.pressButton();  // Output: Light is On

        remote.setCommand(lightOff);
        remote.pressButton();  // Output: Light is Off
    }
}
```

# Observer Pattern

The Observer Pattern establishes a one-to-many dependency between objects. When the state of one object (subject) changes, all dependent objects (observers) are notified automatically. This pattern is commonly used for implementing distributed event-handling systems.

## When to Use
Use the Observer Pattern when multiple objects need to be notified and updated whenever the state of another object changes.

## Example

The following example demonstrates a weather station that notifies multiple display devices whenever the temperature changes.

### Code
```java
// Observer interface
interface Observer {
    void update(float temperature);
}

// Concrete Observer classes
class PhoneDisplay implements Observer {
    @Override
    public void update(float temperature) {
        System.out.println("Phone Display: Temperature is " + temperature + "°C");
    }
}

class WindowDisplay implements Observer {
    @Override
    public void update(float temperature) {
        System.out.println("Window Display: Temperature is " + temperature + "°C");
    }
}

// Subject class
class WeatherStation {
    private float temperature;
    private List<Observer> observers = new ArrayList<>();

    public void addObserver(Observer observer) {
        observers.add(observer);
    }

    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    public void setTemperature(float temperature) {
        this.temperature = temperature;
        notifyObservers();
    }

    private void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(temperature);
        }
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        WeatherStation station = new WeatherStation();
        
        Observer phoneDisplay = new PhoneDisplay();
        Observer windowDisplay = new WindowDisplay();
        
        station.addObserver(phoneDisplay);
        station.addObserver(windowDisplay);

        // Temperature changes trigger notifications to all observers
        station.setTemperature(25);  // Outputs: Phone Display: Temperature is 25°C
                                     //          Window Display: Temperature is 25°C

        station.setTemperature(30);  // Outputs: Phone Display: Temperature is 30°C
                                     //          Window Display: Temperature is 30°C
    }
}
```

# Mediator Pattern

The Mediator Pattern centralizes communication between objects in a system by using a mediator object. This pattern reduces dependencies between classes, simplifies interactions, and promotes loose coupling.

## When to Use
Use the Mediator Pattern when there are multiple interdependent classes that need to interact, and direct communication between them creates complex dependencies.

## Example

In the example below, a `ChatRoom` class acts as a mediator, coordinating communication between multiple `User` objects in a chat application.

### Code
```java
// Mediator interface
interface ChatMediator {
    void showMessage(User user, String message);
}

// Concrete Mediator class
class ChatRoom implements ChatMediator {
    @Override
    public void showMessage(User user, String message) {
        System.out.println(user.getName() + ": " + message);
    }
}

// Colleague class
class User {
    private String name;
    private ChatMediator mediator;

    public User(String name, ChatMediator mediator) {
        this.name = name;
        this.mediator = mediator;
    }

    public String getName() {
        return name;
    }

    public void sendMessage(String message) {
        mediator.showMessage(this, message);
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        ChatMediator chatRoom = new ChatRoom();

        User user1 = new User("Alice", chatRoom);
        User user2 = new User("Bob", chatRoom);

        user1.sendMessage("Hello, Bob!");
        user2.sendMessage("Hey, Alice! How are you?");
    }
}
```

In this example:

- **`ChatMediator` Interface**: Defines a method for displaying messages, allowing communication to be routed through a mediator.
- **`ChatRoom` (Concrete Mediator)**: Implements `ChatMediator` and controls message exchange, acting as a central hub.
- **`User` (Colleague)**: Represents a chat participant who sends messages via the `ChatRoom` mediator, rather than directly to other users.

This setup allows for a flexible communication system where adding or removing users or altering message flow logic can be done by modifying only the mediator, without affecting the user classes.

# Chain of Responsibility Pattern with Express.js Middleware in TypeScript

This example demonstrates the Chain of Responsibility Pattern in an Express.js application using TypeScript. Each middleware is implemented as a separate class, each with a single responsibility, forming a modular and maintainable request processing chain.

## When to Use
Use this pattern in Express.js when you need modular request processing with different responsibilities like authentication, logging, and data compression, and want each part of the process to be isolated in separate classes.

## Example

The following TypeScript example sets up an Express.js server with three middleware classes:
- **Authenticator**: Checks user credentials.
- **Logger**: Logs request information.
- **Compressor**: Sets the response content encoding to simulate compression.

### Code

```typescript
import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = 3000;

// Base middleware handler interface
interface Middleware {
    handle(req: Request, res: Response, next: NextFunction): void;
}

// Middleware: Authenticator
class Authenticator implements Middleware {
    handle(req: Request, res: Response, next: NextFunction): void {
        console.log("Authenticating request...");
        const { username, password } = req.headers;

        if (username === 'admin' && password === 'password') {
            console.log("Authentication successful.");
            next(); // Pass to the next middleware
        } else {
            console.log("Authentication failed.");
            res.status(401).send('Authentication failed');
        }
    }
}

// Middleware: Logger
class Logger implements Middleware {
    handle(req: Request, res: Response, next: NextFunction): void {
        console.log(`Logging request: ${req.method} ${req.url}`);
        next(); // Pass to the next middleware
    }
}

// Middleware: Compressor
class Compressor implements Middleware {
    handle(req: Request, res: Response, next: NextFunction): void {
        console.log("Compressing response data...");
        res.setHeader('Content-Encoding', 'gzip');
        next(); // Pass to the next middleware
    }
}

// Set up the chain of middlewares
const authenticator = new Authenticator();
const logger = new Logger();
const compressor = new Compressor();

// Use middlewares in order
app.use((req, res, next) => authenticator.handle(req, res, next));
app.use((req, res, next) => logger.handle(req, res, next));
app.use((req, res, next) => compressor.handle(req, res, next));

// Route handler
app.get('/', (req, res) => {
    res.send('Response data after authentication, logging, and compression.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

# Visitor Pattern

The **Visitor Pattern** allows new operations to be defined for a set of objects without changing their structures. Instead of adding methods to classes, you create visitor objects that perform operations on elements based on their concrete classes.

## When to Use

- When you want to perform operations across different types of objects without modifying the objects themselves.
- When operations change often, but the structure of the objects remains stable.

## Example

In this example, we have an object structure consisting of `Circle` and `Rectangle` shapes. We use the Visitor Pattern to add new operations for calculating the area and printing information about the shapes, without modifying the shape classes.

### Code

```typescript
// Element Interface
interface Shape {
    accept(visitor: ShapeVisitor): void;
}

// Concrete Elements
class Circle implements Shape {
    constructor(public radius: number) {}

    accept(visitor: ShapeVisitor): void {
        visitor.visitCircle(this);
    }
}

class Rectangle implements Shape {
    constructor(public width: number, public height: number) {}

    accept(visitor: ShapeVisitor): void {
        visitor.visitRectangle(this);
    }
}

// Visitor Interface
interface ShapeVisitor {
    visitCircle(circle: Circle): void;
    visitRectangle(rectangle: Rectangle): void;
}

// Concrete Visitors
class AreaCalculator implements ShapeVisitor {
    visitCircle(circle: Circle): void {
        const area = Math.PI * circle.radius * circle.radius;
        console.log(`Circle Area: ${area}`);
    }

    visitRectangle(rectangle: Rectangle): void {
        const area = rectangle.width * rectangle.height;
        console.log(`Rectangle Area: ${area}`);
    }
}

class ShapePrinter implements ShapeVisitor {
    visitCircle(circle: Circle): void {
        console.log(`Circle with radius: ${circle.radius}`);
    }

    visitRectangle(rectangle: Rectangle): void {
        console.log(`Rectangle with width: ${rectangle.width} and height: ${rectangle.height}`);
    }
}

// Usage
function main() {
    const shapes: Shape[] = [
        new Circle(5),
        new Rectangle(10, 20),
    ];

    const areaCalculator = new AreaCalculator();
    const shapePrinter = new ShapePrinter();

    console.log("Calculating areas:");
    shapes.forEach(shape => shape.accept(areaCalculator));

    console.log("\nPrinting shapes:");
    shapes.forEach(shape => shape.accept(shapePrinter));
}

main();
```