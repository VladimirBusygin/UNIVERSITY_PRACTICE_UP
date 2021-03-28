package bsu.practice.Task5_new;

import java.io.*;
import java.util.Scanner;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

public class JavaWebApplicationServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>" + "Java Web Application" + "</h1>");
        out.println("</body></html>");

    }
}