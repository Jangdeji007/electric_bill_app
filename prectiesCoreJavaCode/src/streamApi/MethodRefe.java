package streamApi;

import java.util.Arrays;
import java.util.List;

public class MethodRefe {

	public static void main(String[] args) {
			
		Character[] ch= {'q','w','a','e','b','d'};
		//List<Character> asList = Arrays.asList(ch);
		Arrays.stream(ch).sorted().forEach(System.out::print);
		
		List<Integer> asList2 = Arrays.asList(121,222,23232,242,32,567);
		
		List<Integer> list = asList2.stream().filter(MethodRefe::isPalindrome).toList();
		System.out.println(list);
		
		String[] str= {"karan","apple","banana","orange"};
		Arrays.stream(str).sorted().forEach(System.out::println);
	}
	
	public static boolean isPalindrome(Integer num)
	{
		int sum=0, num2=num;
		while(num!=0)
		{
			sum = sum*10+num%10;
			num/=10;
		}
		return num2==sum;
	}
}
