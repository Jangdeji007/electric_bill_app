package streamApi;

public class StringRevrse {
	 public static String reverseString(String str, int num)
	 {
		 
		 for(int i=0;i<str.length();i++)
		 {
			 char n=(char) (str.charAt(i)-(num%26)+26);
			 if(n>90)
			 {
				 n=(char)(n-26);
			 }
				 
			System.out.print(n+" ");
		 }
		 return null;
	 }
	public static void main(String[] args) {
		reverseString("NARESHIT",505);
	}

}
//cpgehwxi
