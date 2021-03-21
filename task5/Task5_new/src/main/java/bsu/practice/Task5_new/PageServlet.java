package bsu.practice.Task5_new;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;

public class PageServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        Scanner scanner = new Scanner(new File("/Users/vladimirbusygin/IdeaProjects/Task5_new/src/main/webapp/WEB-INF/page.html"));
        while (scanner.hasNextLine()){
            out.println(scanner.nextLine());
        }

    }
}
