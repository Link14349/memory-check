# Memory Checker
_C++ memory release checker_

## Usage
```bash
memc
```
```bash
memc <memory-log-file>
```

## Program Log Output Mode
Demo
```cpp
UL c = 0;// Description is the nth application/release operation

void* operator new(size_t s) {
    c++;
    auto p = malloc(s);
    std::clog << "n" << p << std::endl;
    return p;
}
void operator delete(void* p) {
    c++;
    std::clog << "d" << p << std::endl;
    free(p);
}
```

## Config
Open 'config.json' in the program installation directory
'new" means that applied for a new piece of memory
'delete" means that freed up a piece of memory
