var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var rigger = require('gulp-rigger');
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');


var config = {
    src: {
        main: "app/",
        js: "js/",
        css: "css/",
        pages: "pages/"
    },
    dest: {
        main: "",
        js: "js/",
        css: "css/",
        pages: "pages/"
    }

};

// дефолтная задача, если в консоли набрать gulp и нажать [enter] - запустится именно она. Можно переопределить.
gulp.task('default', ['watch'], function () {
    console.log('По дефолту просто запускаем нашу watch');
});

gulp.task('rigger', function() {
    gulp.src(config.src.main + config.src.js + '**/*.js')
        .pipe(rigger())
        .pipe(gulp.dest(config.dest.main + config.dest.js));

    gulp.src(config.src.main + config.src.css + '/**/*.css')
        .pipe(rigger())
        .pipe(gulp.dest(config.dest.main + config.dest.css));

    gulp.src(config.src.main + '*.html')
        .pipe(rigger())
        .pipe(gulp.dest(config.dest.main));

    gulp.src(config.src.main + config.src.pages + '/**/*.html')
        .pipe(rigger())
        .pipe(gulp.dest(config.dest.main + config.dest.pages));

    gulp.src("app/img/*.*")
        .pipe(gulp.dest(config.dest.main +"img/"));

    gulp.src("app/font/**/*.*")
        .pipe(gulp.dest(config.dest.main+"font/"));

    gulp.src("app/icon/**/*.*")
        .pipe(gulp.dest(config.dest.main+"icon/"));

    gulp.src("app/*.ico")
        .pipe(gulp.dest(config.dest.main));

});

gulp.task('sass', function () { // Создаем таск "sass"
    console.log('таск "sass"');
    return gulp.src('app/scss/**/*.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        })) // Создаем префиксы
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        })); // Обновляем CSS на странице при изменении
});

gulp.task('scripts', function () {
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js',

    ])
        .pipe(gulp.dest(config.dest.main + config.dest.js));
});

gulp.task('styles', function () {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css'
    ])
        .pipe(gulp.dest(config.dest.main + config.dest.css));
});

// задача browser-sync - запуск сервера для отображения изменений в файлах в режиме онлайн (не надо рефрешить)
gulp.task('browser-sync', function () { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: config.dest.main // это каталог, из которого будут выбираться файлы для отдачи в браузер
        },
        // port: 8082, // для c9.io открыты порты 8081, 8082
        notify: false
    });
});

// задача reload - перезапускает browser-sync для корректного отображения изменений
gulp.task('reload', ['rigger'], function () {
    browserSync.reload();
});

// задача clean - чистим dist
gulp.task('clean', function () {
    console.log("Чистим папку");
    // del.sync(config.dest.main + "**/*");
    del.sync(config.dest.main + config.dest.js);
    del.sync(config.src.main + config.src.css + '/**/*.css');
    del.sync(config.dest.main +"img/");
    del.sync(config.dest.main+"icon/");
    del.sync(config.dest.main+"font/");
});

// в случае изменения сущестующих или появления новых файлов - выполняем задачи js(вывод в консоль сообщения) и reload - перезапуск browser-sync
gulp.task('watch', ['browser-sync', 'sass', 'rigger', 'scripts', 'styles'], function () {
    gulp.watch(config.src.main + config.src.js + '**/*.js', ['reload']);
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch(config.src.main + config.src.css + '**/*.css', ['reload']);
    gulp.watch(config.src.main + '**/*.html', ['reload']);
});
