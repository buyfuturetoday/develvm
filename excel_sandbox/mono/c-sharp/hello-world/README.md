Hello World
===========

Command line
------------

 * To compile, use gmcs: `gmcs hello.cs`
 * The compiler will create "hello.exe", which you can run using: `mono hello.exe`
 * The program should run and output: `Hello Mono World`


GUI
---

`hello2.cs` depends on GTK+ and `hello3.cs` on Winroms. Compile and run in the same way as above.

I had some problems with dependencies (assemblies) on OSX 10.9. This seams to work:

`gmcs /reference:/Library/Frameworks/Mono.framework/Libraries/mono/gtk-sharp-2.0/gtk-sharp.dll /reference:/Library/Frameworks/Mono.framework/Libraries/mono/gtk-sharp-2.0/glib-sharp.dll /reference:/Library/Frameworks/Mono.framework/Libraries/mono/gtk-sharp-2.0/atk-sharp.dll hello2.cs`



ASP
---

Then run the xsp2 command from that directory: `xsp2 --port 8082` (choose a port that is not used)

Use a web browser to contact http://localhost:8082/hello.aspx 




Trouble shooting
----------------

The DLL:s seams to be stored here: `ls /Library/Frameworks/Mono.framework/Libraries/mono`
