package streamApi;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Employee {

	private int id;
	private String name;
	private long mobileNumber;
	private String desi;
	private int salary;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public long getMobileNumber() {
		return mobileNumber;
	}
	public void setMobileNumber(long mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	public String getDesi() {
		return desi;
	}
	public void setDesi(String desi) {
		this.desi = desi;
	}
	public int getSalary() {
		return salary;
	}
	public void setSalary(int salary) {
		this.salary = salary;
	}
	public Employee(int id, String name, long mobileNumber, String desi, int salary) {
		super();
		this.id = id;
		this.name = name;
		this.mobileNumber = mobileNumber;
		this.desi = desi;
		this.salary = salary;
	}
	@Override
	public String toString() {
		return "Employee [id=" + id + ", name=" + name + ", mobileNumber=" + mobileNumber + ", desi=" + desi
				+ ", salary=" + salary + "]";
	}
	
	public static void main(String[] args) {
	List<Employee> emp= new ArrayList<>();
	emp.add(new Employee(2, "karan", 6295340221l, "manager", 25000));
	emp.add(new Employee(3, "subu", 62953404444l, "CEO", 24000));
	emp.add(new Employee(1, "satya", 6295345555l, "devloper", 22000));
	emp.add(new Employee(5, "rahul", 6295340111l, "montors", 21000));
	emp.add(new Employee(6, "shrikant", 6295340000l, "admin", 30000));
	emp.add(new Employee(7, "raj", 6295340288l, "manager", 35000));
	
	double sum = emp.stream().mapToDouble(Employee::getSalary).sum();
	System.out.println(sum);
	Integer reduce = emp.stream()
            .map(Employee::getSalary) // Map employees to their salaries
            .reduce(0, Integer::sum); // Reduce to sum all salaries
	System.out.println(reduce);
//		 emp.stream().filter(a->a.getSalary()>25000).forEach(System.out::println);
	long count = emp.stream().filter(e->e.getDesi().equals("manager")).count();
	System.out.println(count);
	emp.stream().sorted((a,b)->a.getSalary()-b.getSalary()).forEach(System.out::println);
	System.out.println("******************************************");
	emp.stream().filter((a)->a.getName().length()>5).forEach(System.out::println);
	System.out.println("******************************************");
	
	List<Integer> list= Arrays.asList(1,2,7,5,3,6,9);
	list.stream().map(a-> a*a).sorted().forEach(System.out::println);
	System.out.println("******************************************");
	Integer integer = list.stream().reduce((a,b)->a+b).get();
	System.out.println(integer);
	System.out.println("******************222************************");
	int sum2 = list.stream().mapToInt(Integer::intValue).sum();
	System.out.println(sum2);
	System.out.println("******************************************");
	List<Integer> list2 = list.stream().map((a)->a+a).toList();
	System.out.println(list2);
		
	}
}
