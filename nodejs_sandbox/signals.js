#!/usr/bin/env node

/*

List of signals: http://en.wikipedia.org/wiki/Unix_signal

SIGABRT
    The SIGABRT signal is sent to a process to tell it to abort, i.e. to 
    terminate. The signal is usually initiated by the process itself when 
    it calls abort function of the C Standard Library, but it can be sent 
    to the process from outside as well as any other signal.
SIGALRM, SIGVTALRM and SIGPROF
    The SIGALRM, SIGVTALRM and SIGPROF signal is sent to a process when 
    the time limit specified in a call to a preceding alarm setting 
    function (such as setitimer) elapses. SIGALRM is sent when real or 
    clock time elapses. SIGVTALRM is sent when CPU time used by the 
    process elapses. SIGPROF is sent when CPU time used by the process 
    and by the system on behalf of the process elapses.
SIGBUS
    The SIGBUS signal is sent to a process when it causes a bus error. 
    The conditions that lead to the signal being raised are, for example, 
    incorrect memory access alignment or non-existent physical address.
SIGCHLD
    The SIGCHLD signal is sent to a process when a child process terminates, 
    is interrupted, or resumes after being interrupted. One common usage of 
    the signal is to instruct the operating system to clean up the resources 
    used by a child process after its termination without an explicit call 
    to the wait system call.
SIGCONT
    The SIGCONT signal instructs the operating system to restart a process 
    previously paused by the SIGSTOP or SIGTSTP signal. One important use 
    of this signal is in job control in the Unix shell.
SIGFPE
    The SIGFPE signal is sent to a process when it executes an erroneous 
    arithmetic operation, such as division by zero.
SIGHUP
    The SIGHUP signal is sent to a process when its controlling terminal 
    is closed. It was originally designed to notify the process of a serial l
    ine drop. In modern systems, this signal usually means that the controlling 
    pseudo or virtual terminal has been closed.[2]
SIGILL
    The SIGILL signal is sent to a process when it attempts to execute a 
    malformed, unknown, or privileged instruction.
SIGINT
    The SIGINT signal is sent to a process by its controlling terminal when 
    a user wishes to interrupt the process. This is typically initiated by 
    pressing Control-C, but on some systems, the "delete" character or 
    "break" key can be used.[3]
SIGKILL
    The SIGKILL signal is sent to a process to cause it to terminate 
    immediately. In contrast to SIGTERM and SIGINT, this signal cannot be 
    caught or ignored, and the receiving process cannot perform any clean-up 
    upon receiving this signal.
SIGPIPE
    The SIGPIPE signal is sent to a process when it attempts to write to a pipe 
    without a process connected to the other end.
SIGQUIT
    The SIGQUIT signal is sent to a process by its controlling terminal when 
    the user requests that the process perform a core dump.
SIGSEGV
    The SIGSEGV signal is sent to a process when it makes an invalid virtual 
    memory reference, or segmentation fault, i.e. when it performs a 
    segmentation violation.[4]
SIGSTOP
    The SIGSTOP signal instructs the operating system to stop a process for 
    later resumption.
SIGTERM
    The SIGTERM signal is sent to a process to request its termination. 
    Unlike the SIGKILL signal, it can be caught and interpreted or ignored by 
    the process. This allows the process to perform nice termination releasing 
    resources and saving state if appropriate. It should be noted that SIGINT 
    is nearly identical to SIGTERM.
SIGTSTP
    The SIGTSTP signal is sent to a process by its controlling terminal to 
    request it to stop temporarily. It is commonly initiated by the user 
    pressing Control-Z. Unlike SIGSTOP, the process can register a signal 
    handler for or ignore the signal.
SIGTTIN and SIGTTOU
    The SIGTTIN and SIGTTOU signals are sent to a process when it attempts 
    to read or write respectively from the tty while in the background. T
    ypically, this signal can be received only by processes under job control; 
    daemons do not have controlling terminals and should never receive this signal.
SIGUSR1 and SIGUSR2
    The SIGUSR1 and SIGUSR2 signals are sent to a process to indicate 
    user-defined conditions.
SIGPOLL
    The SIGPOLL signal is sent to a process when an asynchronous I/O event 
    occurs.
SIGSYS
    The SIGSYS signal is sent to a process when it passes a bad argument to 
    a system call.
SIGTRAP
    The SIGTRAP signal is sent to a process when a condition arises that a 
    debugger has requested to be informed of — for example, when a particular 
    function is executed, or when a particular variable changes value.
SIGURG
    The SIGURG signal is sent to a process when a socket has urgent or 
    out-of-band data available to read.
SIGXCPU
    The SIGXCPU signal is sent to a process when it has used up the CPU for a 
    duration that exceeds a certain predetermined user-settable value.[5] The 
    arrival of a SIGXCPU signal provides the receiving process a chance to 
    quickly save any intermediate results and to exit gracefully, before it 
    is terminated by the operating system using the SIGKILL signal.
SIGXFSZ
    The SIGXFSZ signal is sent to a process when it grows a file larger than 
    the maximum allowed size.
SIGRTMIN to SIGRTMAX
    The SIGRTMIN to SIGRTMAX signals are intended to be used for user-defined 
    purposes. They are real-time signals. 

-------

vagrant@precise64:/usr/lib/node_modules/jacc$ kill -l
 1) SIGHUP   2) SIGINT   3) SIGQUIT  4) SIGILL   5) SIGTRAP
 6) SIGABRT  7) SIGBUS   8) SIGFPE   9) SIGKILL 10) SIGUSR1
11) SIGSEGV 12) SIGUSR2 13) SIGPIPE 14) SIGALRM 15) SIGTERM
16) SIGSTKFLT   17) SIGCHLD 18) SIGCONT 19) SIGSTOP 20) SIGTSTP
21) SIGTTIN 22) SIGTTOU 23) SIGURG  24) SIGXCPU 25) SIGXFSZ
26) SIGVTALRM   27) SIGPROF 28) SIGWINCH    29) SIGIO   30) SIGPWR
31) SIGSYS  34) SIGRTMIN    35) SIGRTMIN+1  36) SIGRTMIN+2  37) SIGRTMIN+3
38) SIGRTMIN+4  39) SIGRTMIN+5  40) SIGRTMIN+6  41) SIGRTMIN+7  42) SIGRTMIN+8
43) SIGRTMIN+9  44) SIGRTMIN+10 45) SIGRTMIN+11 46) SIGRTMIN+12 47) SIGRTMIN+13
48) SIGRTMIN+14 49) SIGRTMIN+15 50) SIGRTMAX-14 51) SIGRTMAX-13 52) SIGRTMAX-12
53) SIGRTMAX-11 54) SIGRTMAX-10 55) SIGRTMAX-9  56) SIGRTMAX-8  57) SIGRTMAX-7
58) SIGRTMAX-6  59) SIGRTMAX-5  60) SIGRTMAX-4  61) SIGRTMAX-3  62) SIGRTMAX-2
63) SIGRTMAX-1  64) SIGRTMAX

------


Start: node singal.js

Test like this (in a separate terminal):

# Show processes and details
ps -ef 

PID=<PID>
kill -s QUIT $PID && kill -s HUP $PID && kill -s INT  $PID && kill -s ABRT $PID && \
kill -s ALRM $PID && kill -s TERM $PID

# Stops the process:
kill -s KILL $PID


*/


// Start reading from stdin so we don't exit.
process.stdin.resume();


process.on('SIGHUP', function() {
  console.log('Got SIGHUP.');
});

process.on('SIGQUIT', function() {
  console.log('Got SIGQUIT. ');
});

process.on('SIGINT', function() {
  console.log('Got SIGINT.  Press Control-D to exit.');
});

process.on('SIGABRT', function() {
  console.log('Got SIGABRT.');
});

process.on('SIGALRM', function() {
  console.log('Got SIGALRM.');
});

process.on('SIGTERM', function() {
  console.log('Got SIGTERM.');
});

process.on('SIGUSR1', function() {
  console.log('Got SIGUSR1.');
});

process.on('SIGUSR2', function() {
  console.log('Got SIGUSR2.');
});


/*
process.on('SIGSTOP', function() {
  console.log('Got SIGSTOP.');
});
*/

process.on('SIGCONT', function() {
  console.log('Got SIGCONT.');
});


process.on('exit', function() {
  setTimeout(function() {
    console.log('This will not run');
  }, 0);
  console.log('About to exit.');
});


